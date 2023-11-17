// Create a factory for the gameboard
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)

document.addEventListener('DOMContentLoaded', function() {
const gameBoard = (function () { // Gameboard module
    // Create an array to use as playboard
    // Playboard has 9 blocks
    // Playboard starts empty
    // Add array to gameboard object
    let board = [];
    
    // Creates a blanc gameboard (erase)
    const blancGameBoard = () => {
        board = Array(9).fill(null);
    };

    // Updates board array with players input and their symbol
    const updateGameBoard = (playerSymbol, input) => {
        board[input] = playerSymbol;
        console.log(board);
    }

    const getBoard = () => {
        return board;
    }

    return { blancGameBoard, updateGameBoard, getBoard };
})();



// Create a factory function for the players (player 1 = user, player 2 = computer)
// When factory is created, create player1 and player2
function createPlayer(name, symbol) { // player factory
    return { name, symbol };
}

const playerUser = createPlayer('Steffan', 'X');

const playerComputer = createPlayer('Robotucus', 'O');


// create and add functionality to gamecontroller object to check gamestatus
// Announce winner, stop game if player 1 or player 2 has 3 in a row. 
// If not check if all 9 blocks are full = draw
// If both not true continue game
// Do this after every move from player 1 or 2
const gameController = (function () { // gamecontroller module
    
    let filledBlocks = 0; // 0 blocks = empty, 9 blocks = full grid
    let result = '';

    const gameEndReset = () => {
        filledBlocks = 0;
        result = '';
    } 

    const gameEndCheck = function (currentBoard) { // Loops through board array to see how many items are filled. 
        
        filledBlocks = 0;

        for (let i = 0; i < currentBoard.length; i++){ // checks whose turn it is
            if (currentBoard[i] !== null) {
                filledBlocks = filledBlocks + 1;
            };
        };

        for (let i = 0; i < 3; i++){ 
            // checking rows for winner
            if (currentBoard[i * 3] !== null && currentBoard[i * 3] === currentBoard[(i * 3) + 1] && currentBoard[i * 3] === currentBoard[(i * 3) + 2]){
                console.log('We have a winner: ' + currentBoard[i*3]);
                result = currentBoard[i*3];
                displayController.endGameModal();
                // return currentBoard[i*3];
            };

            // checking columns for winner
            if (currentBoard[i] !== null && currentBoard[i] === currentBoard[i + 3] && currentBoard[i] === currentBoard[i + 6]){
                console.log('We have a winner: ' + currentBoard[i]);
                result = currentBoard[i];
                displayController.endGameModal();
                // return currentBoard[i];
            }
        };

        // checking for diagonal winner
        if (currentBoard[0] !== null && currentBoard[0] === currentBoard[4] && currentBoard[0] === currentBoard[8]){
            console.log('We have a winner: ' + currentBoard[0]);
            result = currentBoard[0];
            displayController.endGameModal();
            // return currentBoard[0];
        }

        // checking for diagonal winner
        if (currentBoard[2] !== null && currentBoard[2] === currentBoard[4] && currentBoard[2] === currentBoard[6]){
            console.log('We have a winner: ' + currentBoard[2]);
            result = currentBoard[2];
            displayController.endGameModal();
            // return currentBoard[2];
        }

        if (filledBlocks === 9 && result === '') {
            result = 'draw';
            displayController.endGameModal();
            // console.log('END GAME');
        }
    };

    const gameTurn = function (input){
        console.log(filledBlocks);
        if (filledBlocks % 2 == 0) { // even
            gameBoard.updateGameBoard(playerUser.symbol, input);
            gameController.gameEndCheck(gameBoard.getBoard());
        } else {
            gameBoard.updateGameBoard(playerComputer.symbol, input);
        }
        gameController.gameEndCheck(gameBoard.getBoard());
        displayController.displayGridGameboard(gameBoard.getBoard());
    }

    const getGameTurnSymbol = function (){
        return filledBlocks;
    }

    const getResult = () => {
        return result;
    }

    return {filledBlocks, gameEndCheck, gameTurn, getGameTurnSymbol, getResult, gameEndReset};
})();






// Create a factory for the displayController
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)
const displayController = ( () => {
    const container = document.querySelector('.container');
    
    const deleteGridGameboard = () => {
        while (container.firstChild){
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

        if (gameController.getResult() === 'X'){
            resultModal.classList.add('win');
        } else if (gameController.getResult() === 'O'){
            resultModal.classList.add('lose');
        } else {
                resultModal.classList.add('draw');
            }


        resultModal.showModal();

        const resultModalNewGameButton = document.querySelector('#newGame')

        resultModalNewGameButton.addEventListener('click', () => {
            gameBoard.blancGameBoard();
            gameController.gameEndReset();
            displayController.displayGridGameboard(gameBoard.getBoard());
            resultModal.close();
        })
    }
    

    return { displayGridGameboard, deleteGridGameboard, endGameModal };
})();





// tests



// Creates blanc gameboard
gameBoard.blancGameBoard();
displayController.displayGridGameboard(gameBoard.getBoard());
// const testGameBoard = ["X", "O", null, "X", "O", null, "X", null, "O"];
// gameController.gameEndCheck(testGameBoard);

// for (let i = 0; i < 2; i++){
//     gameController.gameTurn(); 
// }

// console.table(playerUser);
// console.table(playerComputer);
// console.table(gameBoard);
// console.table(gameController);



});