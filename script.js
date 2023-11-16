// Create a factory for the gameboard
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)


const gameBoard = (function () {
    // Create an array to use as playboard
    // Playboard has 9 blocks
    // Playboard starts empty
    // Player 1 and Player 2 can fill 1 empty block in turns
    // Add array to gameboard object
    let board = [];
    
    // Creates a black gameboard (erase)
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

    return { board, blancGameBoard, updateGameBoard, getBoard };
})();






// Create a factory function for the players (player 1 = user, player 2 = computer)
// When factory is created, create player1 and player2
function createPlayer(name, symbol) {
    
    const getInputPlayer = function () {
        const input = window.prompt("Your turn " + name);
        return input;
    };
    
    return { name, symbol, getInputPlayer };
}

const playerUser = createPlayer('Steffan', 'X');
// console.log(playerUser);
// console.log(playerUser.getInputPlayer());

const playerComputer = createPlayer('Robotucus', 'O');
// console.log(playerComputer);


// create and add functionality to gamecontroller object to check gamestatus
// Announce winner, stop game if player 1 or player 2 has 3 in a row. 
// If not check if all 9 blocks are full = draw
// If both not true continue game
// Do this after every move from player 1 or 2
const gameController = (function () {
    const gameEndCheck = function (currentBoard, gameBoard) {
        let filledBlocks = 0; // 0 blocks = empty, 9 blocks = full grid
        const currentGameBoard = currentBoard;
        // console.log(currentGameBoard);

        for (let i = 0; i < currentBoard.length; i++){
            // console.log(gameBoard[i] + ' succes');
            if (currentBoard[i] !== null) {
                filledBlocks++;
            };
        };

        // console.log(filledBlocks + ' Filled blocks');

        if (filledBlocks === 9){
            console.log('END GAME');
        } else if (filledBlocks % 2 == 0){ // even
            gameBoard.updateGameBoard(playerUser.symbol, playerUser.getInputPlayer());
        } else {
            gameBoard.updateGameBoard(playerComputer.symbol, playerComputer.getInputPlayer());
        }
    };

    return {gameEndCheck};
})();






// Create a factory for the displayController
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)






// tests


gameBoard.blancGameBoard();

gameBoard.updateGameBoard(playerUser.symbol, playerUser.getInputPlayer());
gameBoard.updateGameBoard(playerComputer.symbol, playerComputer.getInputPlayer());
// console.log('The game board = ' + gameBoard.getBoard());

gameController.gameEndCheck(gameBoard.getBoard(), gameBoard);



// console.log(board);