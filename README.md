const socket = io();

const state = {
  roomCode: '',
  isAdmin: false,
  myAlias: '',
  myCard: [],
  history: [],
  clients: [],
  winners: [],
  marked: new Set()
};

const adminForm = document.getElementById('adminForm');
const clientForm = document.getElementById('clientForm');
const roomCodeLabel = document.getElementById('roomCodeLabel');
const totalClients = document.getElementById('totalClients');
const lastCall = document.getElementById('lastCall');
const winnerCount = document.getElementById('winnerCount');
const cardBoard = document.getElementById('cardBoard');
const historyList = document.getElementById('historyList');
const clientsList = document.getElementById('clientsList');
const winnerList = document.getElementById('winnerList');
const clientAliasTag = document.getElementById('clientAliasTag');
const drawButton = document.getElementById('drawButton');
const resetButton = document.getElementById('resetButton');
const clearMarksButton = document.getElementById('clearMarksButton');

function updateRoomLabel() {
  roomCodeLabel.textContent = `Sala: ${state.roomCode || '--'}`;
}

function renderHistory() {
  historyList.innerHTML = '';

  if (!state.history.length) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum sorteio';
    historyList.appendChild(item);
    lastCall.textContent = '—';
    return;
  }

  lastCall.textContent = state.history[0];

  state.history.slice(0, 9).forEach((value) => {
    const item = document.createElement('li');
    item.textContent = value;
    historyList.appendChild(item);
  });
}

function renderClients() {
  totalClients.textContent = String(state.clients.length);
  clientsList.innerHTML = '';

  if (!state.clients.length) {
    const empty = document.createElement('li');
    empty.textContent = 'Nenhum cliente conectado';
    clientsList.appendChild(empty);
    return;
  }

  state.clients.forEach((client) => {
    const item = document.createElement('li');
    const alias = document.createElement('span');
    alias.textContent = client.alias;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Vencedor';
    button.addEventListener('click', () => {
      if (!state.roomCode) return;
      socket.emit('declare-winner', { roomCode: state.roomCode, alias: client.alias });
    });

    item.appendChild(alias);
    item.appendChild(button);
    clientsList.appendChild(item);
  });
}

function renderWinners() {
  winnerCount.textContent = String(state.winners.length);
  winnerList.innerHTML = '';

  if (!state.winners.length) {
    const empty = document.createElement('li');
    empty.textContent = 'Sem vencedor';
    winnerList.appendChild(empty);
    return;
  }

  state.winners.forEach((winner) => {
    const item = document.createElement('li');
    item.textContent = winner;
    winnerList.appendChild(item);
  });
}

function renderCard(card = []) {
  if (!card || !card.length) {
    cardBoard.innerHTML = '';
    return;
  }

  const calledValues = new Set(state.history);

  cardBoard.innerHTML = '';
  card.forEach((cell) => {
    const cellElement = document.createElement('button');
    cellElement.type = 'button';
    cellElement.className = 'card-cell';

    if (calledValues.has(cell)) {
      cellElement.classList.add('called');
    }

    if (state.marked.has(cell)) {
      cellElement.classList.add('marked');
    }

    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => {
      if (!state.myAlias || !state.myCard.length) return;

      if (state.marked.has(cell)) {
        state.marked.delete(cell);
      } else {
        state.marked.add(cell);
      }

      renderCard(state.myCard);
    });

    cardBoard.appendChild(cellElement);
  });
}

adminForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomCode = document.getElementById('adminRoom').value.trim();
  const names = document.getElementById('namesInput').value.trim();

  if (!roomCode || !names) return;

  state.roomCode = roomCode.toUpperCase();
  state.isAdmin = true;
  updateRoomLabel();
  socket.emit('upsert-room', { roomCode: state.roomCode, names });
});

clientForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomCode = document.getElementById('clientRoom').value.trim();
  const alias = document.getElementById('clientAlias').value.trim();

  if (!roomCode || !alias) return;

  state.roomCode = roomCode.toUpperCase();
  state.isAdmin = false;
  state.myAlias = alias;
  clientAliasTag.textContent = alias;
  updateRoomLabel();
  socket.emit('join-room', { roomCode: state.roomCode, alias });
});

drawButton.addEventListener('click', () => {
  if (!state.roomCode) return;
  socket.emit('draw-name', { roomCode: state.roomCode });
});

resetButton.addEventListener('click', () => {
  if (!state.roomCode) return;
  socket.emit('reset-room', { roomCode: state.roomCode });
  state.myCard = [];
  state.marked.clear();
  state.history = [];
  state.clients = [];
  state.winners = [];
  renderHistory();
  renderCard(state.myCard);
  renderClients();
  renderWinners();
});

clearMarksButton.addEventListener('click', () => {
  state.marked.clear();
  renderCard(state.myCard);
});

socket.on('connect', () => {
  if (state.roomCode) {
    socket.emit('request-room-state', { roomCode: state.roomCode });
  }
});

socket.on('room-state', (room) => {
  if (!room || !room.roomCode) return;

  state.roomCode = room.roomCode;
  state.history = room.drawHistory || [];
  state.clients = room.clients || [];
  state.winners = room.winners || [];

  updateRoomLabel();
  renderClients();
  renderWinners();
  renderHistory();

  if (room.adminSocketId === socket.id) {
    state.isAdmin = true;
  }
});

socket.on('my-card', ({ card, alias }) => {
  state.myCard = card || [];
  state.myAlias = alias || state.myAlias;
  clientAliasTag.textContent = state.myAlias || 'Cliente';
  state.marked.clear();
  renderCard(state.myCard);
});

socket.on('draw-result', ({ value, history }) => {
  state.history = history || [];
  renderHistory();
  renderCard(state.myCard);
});

socket.on('room-error', ({ message }) => {
  window.alert(message);
});

renderHistory();
renderClients();
renderWinners();
renderCard(state.myCard);
updateRoomLabel();
