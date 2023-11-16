// Create a factory for the gameboard
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)


const gameBoard = (function () {
    // Create an array to use as playboard
    // Playboard has 9 blocks
    // Playboard starts empty
    // Player 1 and Player 2 can fill 1 empty block in turns
    // Add array to gameboard object
    board = [];
    
    const blancGameBoard = () => {
        board = [ , , , , , , , , ,]
        return board;
    };

    return { blancGameBoard };
})();


gameBoard.blancGameBoard();
console.log(board);

// Create a factory function for the players (player 1 = user, player 2 = computer)
// When factory is created, create player1 and player2
function createPlayer(name, symbol) {
    return { name, symbol };
}

const playerUser = createPlayer('Steffan', 'X');
console.log(playerUser);

const playerComputer = createPlayer('Robotucus', 'O');
console.log(playerComputer);


// create and add functionality to gamecontroller object to check gamestatus
// Announce winner, stop game if player 1 or player 2 has 3 in a row. 
// If not check if all 9 blocks are full = draw
// If both not true continue game
// Do this after every move from player 1 or 2
// const gameController = 






// Create a factory for the displayController
// Wrap the factory inside an IIFE to create a modolue pattern (don't want multiple copies)



