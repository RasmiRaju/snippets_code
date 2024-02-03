let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const board = document.getElementById('board');
const result = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');
const gameScreen = document.getElementById('gameScreen');

function handleCellClick(index) {
    if (gameBoard[index] === '' && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            showResult('It\'s a tie!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function updateBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('button');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function isGameOver() {
    return checkWinner() || isBoardFull();
}

function showResult(message) {
    result.textContent = message;

    // Remove the existing board
    board.innerHTML = '';

    // Create a new board
    updateBoard();
}
  
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    result.textContent = '';

    // Remove the existing board
    board.innerHTML = '';

    // Create a new board
    updateBoard();
}
  
// Initial board setup
updateBoard();
