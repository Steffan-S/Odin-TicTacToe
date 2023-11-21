// Factory for the gameboard
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)

document.addEventListener('DOMContentLoaded', function () { // loads HTML before javascript
    const gameBoard = (function () { // Gameboard module

        // empty array to use as playboard
        let board = [];

        // Creates a blanc gameboard (erase)
        const blancGameBoard = () => {
            board = Array(9).fill(null);
        };

        // Updates board array with players input and their symbol
        const updateGameBoard = (playerSymbol, input) => {
            board[input] = playerSymbol;
            console.log(board);
        };

        const getBoard = () => {
            return board;
        };

        return { blancGameBoard, updateGameBoard, getBoard };
    })();


    // Factory for the players (player 1 = user, player 2 = computer)
    function createPlayer(name, symbol) { // player factory
        return { name, symbol };
    }

    const playerUser = createPlayer('Steffan', 'X');
    const playerComputer = createPlayer('Robotucus', 'O');


    // Gamecontroller IIFE module    
    const gameController = (function () { 

        let filledBlocks = 0; // 0 blocks = empty, 9 blocks = full grid
        let result = '';
        let scoreYou = 0;
        let scoreComputer = 0;

        const gameScoreReset = () => {
            scoreYou = 0;
            scoreComputer = 0;
            scoreYouUi.textContent = scoreYou;
            scoreComputerUi.textContent = scoreComputer;
        }

        const gameEndReset = () => {
            filledBlocks = 0;
            result = '';
        }

        const gameEndCheck = function (currentBoard) {
            filledBlocks = 0;

            for (let i = 0; i < currentBoard.length; i++) { // Figures out who's turn it is
                if (currentBoard[i] !== null) {
                    filledBlocks = filledBlocks + 1;
                };
            };

            for (let i = 0; i < 3; i++) {
                // checking rows for winner
                if (currentBoard[i * 3] !== null && currentBoard[i * 3] === currentBoard[(i * 3) + 1] && currentBoard[i * 3] === currentBoard[(i * 3) + 2]) {
                    console.log('We have a winner: ' + currentBoard[i * 3]);
                    gameController.gameScoreCheck(currentBoard[i * 3]);
                    result = currentBoard[i * 3];
                    displayController.endGameModal();
                };

                // checking columns for winner
                if (currentBoard[i] !== null && currentBoard[i] === currentBoard[i + 3] && currentBoard[i] === currentBoard[i + 6]) {
                    console.log('We have a winner: ' + currentBoard[i]);
                    gameController.gameScoreCheck(currentBoard[i]);
                    result = currentBoard[i];
                    displayController.endGameModal();
                }
            };

            // checking for diagonal winner
            if (currentBoard[0] !== null && currentBoard[0] === currentBoard[4] && currentBoard[0] === currentBoard[8]) {
                console.log('We have a winner: ' + currentBoard[0]);
                gameController.gameScoreCheck(currentBoard[0]);
                result = currentBoard[0];
                displayController.endGameModal();
            };

            // checking for diagonal winner
            if (currentBoard[2] !== null && currentBoard[2] === currentBoard[4] && currentBoard[2] === currentBoard[6]) {
                console.log('We have a winner: ' + currentBoard[2]);
                gameController.gameScoreCheck(currentBoard[2]);
                result = currentBoard[2];
                displayController.endGameModal();
            };

            // checking for draw
            if (filledBlocks === 9 && result === '') {
                result = 'draw';
                displayController.endGameModal();
            };
        };

        const scoreYouUi = document.getElementById('score_you');
        const scoreComputerUi = document.getElementById('score_computer');

        const gameScoreCheck = (winner) => {
            if (winner === 'X') {
                scoreYou = scoreYou + 1;
                scoreYouUi.textContent = scoreYou;
            } else if (winner === 'O') {
                scoreComputer = scoreComputer + 1;
                scoreComputerUi.textContent = scoreComputer;
            };
        };

        const gameTurn = function (input) {
            console.log(filledBlocks);
            if (filledBlocks % 2 == 0) { // even
                gameBoard.updateGameBoard(playerUser.symbol, input);
            } else {
                gameBoard.updateGameBoard(playerComputer.symbol, input);
            }
            gameController.gameEndCheck(gameBoard.getBoard());
            displayController.displayGridGameboard(gameBoard.getBoard());
        };

        const getGameTurnSymbol = () => {
            return filledBlocks;
        };

        const getResult = () => {
            return result;
        };

        return { filledBlocks, gameEndCheck, gameTurn, getGameTurnSymbol, getResult, gameEndReset, gameScoreCheck, gameScoreReset };
    })();



    // IIFE module for displaycontroller (don't want multiple copies)
    const displayController = (() => {
        const container = document.querySelector('.container');

        const deleteGridGameboard = () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        const displayGridGameboard = (gameboard) => {
            deleteGridGameboard(); // deletes all appended container to main container before adding 9 new containers

            for (let i = 0; i < gameBoard.getBoard().length; i++) {
                const div = document.createElement('div');
                div.classList.add('gameboardblock', i);
                div.textContent = gameboard[i];

                if (gameboard[i] === null) { // checks if grid block is empty or not
                    div.addEventListener('mouseover', () => {
                        if (gameController.getGameTurnSymbol() % 2 == 0 && gameBoard.getBoard[i] !== null) { // even
                            div.textContent = 'X';
                        } else if (gameBoard.getBoard[i] !== null) {
                            div.textContent = 'O';
                        }
                    });

                    div.addEventListener('mouseout', () => {
                        div.textContent = ''
                    })

                    div.addEventListener('click', () => {
                        const input = i;
                        gameController.gameTurn(input);
                    });
                }
                container.appendChild(div);
            }
        }

        const endGameModal = () => {
            const resultModal = document.querySelector('dialog');
            const h2 = document.getElementById('resultH2');

            if (gameController.getResult() === 'X') {
                resultModal.className = 'win';
                h2.className = 'h2win';
                h2.textContent = 'You Win!';

            } else if (gameController.getResult() === 'O') {
                resultModal.className = 'lose';
                h2.className = 'h2lose';
                h2.textContent = 'You lose!';
            } else {
                resultModal.className = 'draw';
                h2.className = 'h2draw';
                h2.textContent = 'You draw!';
            }

            resultModal.appendChild(h2);
            resultModal.showModal();

            const resultModalNewGameButton = document.querySelector('#newGame')

            resultModalNewGameButton.addEventListener('click', () => {
                gameBoard.blancGameBoard();
                gameController.gameEndReset();
                displayController.displayGridGameboard(gameBoard.getBoard());
                resultModal.close();
            })
        }

        const GameButtons = () => {
            const resetGameButton = document.getElementById('resetGame');

            resetGameButton.addEventListener('click', () => {
                gameController.gameEndReset();
                gameController.gameScoreReset();
                gameBoard.blancGameBoard();
                displayController.displayGridGameboard(gameBoard.getBoard());
            });

            const setYourNameButton = document.getElementById('setYourName');
            const yourName = document.getElementById('yourName');

            setYourNameButton.addEventListener('click', () => {
                const name = prompt('Your name is ...?');
                yourName.textContent = name;
            });
        }

        return { displayGridGameboard, deleteGridGameboard, endGameModal, GameButtons };
    })();

    // Loads blanc gameboard and UI on pageload
    gameBoard.blancGameBoard();
    displayController.displayGridGameboard(gameBoard.getBoard());
    displayController.GameButtons();
});