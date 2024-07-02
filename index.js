document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const updateStatus = (message) => statusDisplay.innerHTML = message;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    updateStatus(currentPlayerTurn());

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.innerHTML = currentPlayer;

        if (checkWin()) {
            updateStatus(`Player ${currentPlayer} has won!`);
            gameActive = false;
        } else if (gameState.every(cell => cell)) {
            updateStatus('Game ended in a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus(currentPlayerTurn());
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill('');
        updateStatus(currentPlayerTurn());
        cells.forEach(cell => cell.innerHTML = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});

