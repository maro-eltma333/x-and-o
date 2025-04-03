const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(cell, index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        setTimeout(restartGame, 1500); // Auto restart after 1.5 seconds
        return;
    }

    if (checkDraw()) {
        status.textContent = "Game ended in a draw!";
        gameActive = false;
        setTimeout(restartGame, 1500); // Auto restart after 1.5 seconds
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
} 