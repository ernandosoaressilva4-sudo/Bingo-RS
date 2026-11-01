const socket = io();

const state = {
  roomCode: '',
  isAdmin: false,
  myCard: [],
  history: []
};

const adminForm = document.getElementById('adminForm');
const clientForm = document.getElementById('clientForm');
const roomCodeLabel = document.getElementById('roomCodeLabel');
const cardBoard = document.getElementById('cardBoard');
const historyList = document.getElementById('historyList');
const clientAliasTag = document.getElementById('clientAliasTag');
const drawButton = document.getElementById('drawButton');

function updateRoomLabel() {
  roomCodeLabel.textContent = `Sala: ${state.roomCode || '--'}`;
}

function renderHistory() {
  historyList.innerHTML = '';

  if (!state.history.length) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum sorteio ainda';
    historyList.appendChild(item);
    return;
  }

  state.history.forEach((value) => {
    const item = document.createElement('li');
    item.textContent = value;
    historyList.appendChild(item);
  });
}

function renderCard(card = []) {
  if (!card || !card.length) {
    cardBoard.innerHTML = '';
    return;
  }

  const highlightValues = new Set(state.history.slice(0, 10));

  cardBoard.innerHTML = '';
  card.forEach((cell) => {
    const cellElement = document.createElement('div');
    cellElement.className = `card-cell ${highlightValues.has(cell) ? 'highlight' : ''}`;
    cellElement.textContent = cell;
    cardBoard.appendChild(cellElement);
  });
}

adminForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomCode = document.getElementById('adminRoom').value.trim();
  const names = document.getElementById('namesInput').value.trim();

  if (!roomCode || !names) {
    return;
  }

  state.roomCode = roomCode.toUpperCase();
  state.isAdmin = true;
  updateRoomLabel();
  socket.emit('upsert-room', { roomCode: state.roomCode, names });
});

clientForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const roomCode = document.getElementById('clientRoom').value.trim();
  const alias = document.getElementById('clientAlias').value.trim();

  if (!roomCode || !alias) {
    return;
  }

  state.roomCode = roomCode.toUpperCase();
  state.isAdmin = false;
  updateRoomLabel();
  clientAliasTag.textContent = alias;
  socket.emit('join-room', { roomCode: state.roomCode, alias });
});

drawButton.addEventListener('click', () => {
  if (!state.roomCode) {
    return;
  }

  socket.emit('draw-name', { roomCode: state.roomCode });
});

socket.on('connect', () => {
  if (state.roomCode) {
    socket.emit('request-room-state', { roomCode: state.roomCode });
  }
});

socket.on('room-state', (room) => {
  if (!room || !room.roomCode) {
    return;
  }

  state.roomCode = room.roomCode;
  updateRoomLabel();

  if (room.drawHistory) {
    state.history = room.drawHistory;
    renderHistory();
  }

  if (room.adminSocketId === socket.id) {
    state.isAdmin = true;
  }
});

socket.on('my-card', ({ card, alias }) => {
  state.myCard = card || [];
  if (alias) {
    clientAliasTag.textContent = alias;
  }
  renderCard(state.myCard);
});

socket.on('draw-result', ({ value, history }) => {
  state.history = history || [];
  renderHistory();

  if (state.myCard.length) {
    renderCard(state.myCard);
  }
});

socket.on('room-error', ({ message }) => {
  window.alert(message);
});

renderHistory();
renderCard(state.myCard);
updateRoomLabel();
