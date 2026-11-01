const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = new Map();

function normalizeRoomCode(code = '') {
  return String(code).trim().toUpperCase();
}

function parseNames(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 25);
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function buildCard(names) {
  if (!names.length) {
    return Array.from({ length: 25 }, (_, index) => `Cartela ${index + 1}`);
  }

  const list = shuffle(names);
  const board = [];

  for (let index = 0; index < 25; index += 1) {
    board.push(list[index % list.length]);
  }

  return board;
}

function getRoom(roomCode) {
  const normalized = normalizeRoomCode(roomCode);
  if (!rooms.has(normalized)) {
    rooms.set(normalized, {
      roomCode: normalized,
      adminSocketId: null,
      names: [],
      drawHistory: [],
      clients: new Map()
    });
  }

  return rooms.get(normalized);
}

function getPublicRoomState(room) {
  return {
    roomCode: room.roomCode,
    adminSocketId: room.adminSocketId,
    names: room.names,
    drawHistory: room.drawHistory,
    clients: Array.from(room.clients.values()).map((client) => ({
      id: client.id,
      alias: client.alias
    }))
  };
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_, response) => {
  response.json({ ok: true, rooms: rooms.size });
});

io.on('connection', (socket) => {
  socket.on('upsert-room', ({ roomCode, names }) => {
    const normalized = normalizeRoomCode(roomCode);
    const room = getRoom(normalized);
    const parsedNames = parseNames(names);

    room.names = parsedNames;
    room.adminSocketId = socket.id;

    Array.from(room.clients.values()).forEach((client) => {
      client.card = buildCard(room.names);
      socket.to(room.roomCode).emit('my-card', { card: client.card, alias: client.alias });
    });

    socket.join(room.roomCode);
    io.to(room.roomCode).emit('room-state', getPublicRoomState(room));
  });

  socket.on('join-room', ({ roomCode, alias }) => {
    const normalized = normalizeRoomCode(roomCode);
    const room = getRoom(normalized);

    if (!room.names.length) {
      socket.emit('room-error', { message: 'A sala ainda não foi configurada pelo administrador.' });
      return;
    }

    socket.join(room.roomCode);

    const client = {
      id: socket.id,
      alias: alias || `Cliente ${room.clients.size + 1}`,
      card: buildCard(room.names)
    };

    room.clients.set(socket.id, client);
    socket.emit('my-card', { card: client.card, alias: client.alias });
    io.to(room.roomCode).emit('room-state', getPublicRoomState(room));
  });

  socket.on('draw-name', ({ roomCode }) => {
    const normalized = normalizeRoomCode(roomCode);
    const room = getRoom(normalized);

    if (room.adminSocketId !== socket.id) {
      socket.emit('room-error', { message: 'Apenas o administrador pode sortear nomes.' });
      return;
    }

    if (!room.names.length) {
      socket.emit('room-error', { message: 'Adicione pelo menos um nome antes de sortear.' });
      return;
    }

    const draw = room.names[Math.floor(Math.random() * room.names.length)];
    room.drawHistory = [draw, ...room.drawHistory].slice(0, 10);
    io.to(room.roomCode).emit('draw-result', { value: draw, history: room.drawHistory });
  });

  socket.on('request-room-state', ({ roomCode }) => {
    const room = getRoom(normalizeRoomCode(roomCode));
    const client = room.clients.get(socket.id);
    if (client) {
      socket.emit('my-card', { card: client.card, alias: client.alias });
    }

    socket.emit('room-state', getPublicRoomState(room));
  });

  socket.on('disconnect', () => {
    for (const room of rooms.values()) {
      if (room.adminSocketId === socket.id) {
        room.adminSocketId = null;
      }

      if (room.clients.has(socket.id)) {
        room.clients.delete(socket.id);
      }

      if (room.roomCode) {
        io.to(room.roomCode).emit('room-state', getPublicRoomState(room));
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
