document.addEventListener('DOMContentLoaded', () => {
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');
    const startGameButton = document.getElementById('startGame');
    const gameBoard = document.getElementById('game-board');
    const scoreboard = document.getElementById('scoreboard');
    const playerXNameDisplay = document.getElementById('playerXName');
    const playerONameDisplay = document.getElementById('playerOName');
    const playerXWinsDisplay = document.getElementById('playerXWins');
    const playerOWinsDisplay = document.getElementById('playerOWins');
    const playAgainXButton = document.getElementById('playAgainX');
    const playAgainOButton = document.getElementById('playAgainO');
    const tingSound = new Audio("ting.mp3");
    const gameOverSound = new Audio("game over.mp3"); 
    const cells = document.querySelectorAll(".cell");

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let playerXWins = 0;
    let playerOWins = 0;

    startGameButton.addEventListener('click', () => {
        const playerXName = playerXInput.value || 'Player X';
        const playerOName = playerOInput.value || 'Player O';

        playerXNameDisplay.textContent = playerXName;
        playerONameDisplay.textContent = playerOName;

        document.getElementById('player-names').classList.add('hidden');
        gameBoard.classList.remove('hidden');
        scoreboard.classList.remove('hidden');
    });

    gameBoard.addEventListener('click', (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (!index || boardState[index] !== '') return;

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        tingSound.currentTime = 0;
        tingSound.play();

        if (checkWin()) {
            updateScoreboard(currentPlayer);
            setTimeout(() => {
                gameOverSound.play(); 
                alert(`${currentPlayer === 'X' ? playerXInput.value || 'Player X' : playerOInput.value || 'Player O'} wins!`);
                resetBoard();
            }, 200);
        } else if (boardState.every(cell => cell !== '')) {
            setTimeout(() => {
                gameOverSound.play(); 
                alert('It\'s a draw!');
                resetBoard();
            }, 200);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });

    playAgainXButton.addEventListener('click', resetBoard);
    playAgainOButton.addEventListener('click', resetBoard);

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => boardState[index] === currentPlayer)
        );
    }

    function updateScoreboard(winner) {
        if (winner === 'X') {
            playerXWins++;
            playerXWinsDisplay.textContent = playerXWins;
        } else {
            playerOWins++;
            playerOWinsDisplay.textContent = playerOWins;
        }
    }

    function resetBoard() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});
