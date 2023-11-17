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
    
    const getInputPlayer = function (gameboard) {
        let input = window.prompt("Hey " + name + ", Enter a number between 0 and 9");

        while (input > 9 || input < 0 || gameboard[input] !== null){
            console.log(gameboard[input]);
            input = window.prompt("Try again " + name + ", Enter a number between 0 and 9");
        }

        return input;
    };
    
    return { name, symbol, getInputPlayer };
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

    const gameEndCheck = function (currentBoard) { // Loops through board array to see how many items are filled. 
        filledBlocks = 0;

        for (let i = 0; i < currentBoard.length; i++){
            if (currentBoard[i] !== null) {
                filledBlocks = filledBlocks + 1;
            };
        };

        if (filledBlocks === 9) {
            console.log('END GAME');
        }
    };

    const gameTurn = function (){
        console.log(filledBlocks);
        if (filledBlocks % 2 == 0) { // even
            gameBoard.updateGameBoard(playerUser.symbol, playerUser.getInputPlayer(gameBoard.getBoard()));
            gameController.gameEndCheck(gameBoard.getBoard());
        } else {
            gameBoard.updateGameBoard(playerComputer.symbol, playerComputer.getInputPlayer(gameBoard.getBoard()));
            gameController.gameEndCheck(gameBoard.getBoard());
        }
    }

    return {filledBlocks, gameEndCheck, gameTurn};
})();






// Create a factory for the displayController
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)






// tests

// Creates blanc gameboard
gameBoard.blancGameBoard();

// for (let i = 0; i < 9; i++){
//     gameController.gameTurn(); 
// }

// console.table(playerUser);
// console.table(playerComputer);
// console.table(gameBoard);
// console.table(gameController);



});