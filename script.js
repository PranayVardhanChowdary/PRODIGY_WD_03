const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board;
let currentPlayer;
let gameActive;

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

startGame();

function startGame() {
  board = Array.from(Array(9).keys());
  currentPlayer = X_CLASS;
  gameActive = true;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setMessage(`Player ${currentPlayer}'s turn`);
}

function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);
  if (!gameActive || typeof board[cellIndex] !== 'number') return;
  board[cellIndex] = currentPlayer;
  cell.classList.add(currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    setMessage(`Player ${currentPlayer}'s turn`);
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

function isDraw() {
  return board.every(cell => typeof cell === 'string');
}

function endGame(draw) {
  if (draw) {
    setMessage('Draw!');
  } else {
    setMessage(`Player ${currentPlayer} wins!`);
  }
  gameActive = false;
}

function setMessage(msg) {
  message.textContent = msg;
}

function reset() {
  startGame();
}
