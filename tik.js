const prompt = require('prompt-sync')({ sigint: true });

const N_SIZE = 3;
const EMPTY = ' ';
// let board;
let turn = 'X';
let moves;

// Initialize the board with empty values
let board = [];

// Map grid numbers to row-column coordinates
const gridMapping = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2]
};

/*
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    /*replaced with loop logic */
    // board = Array(N_SIZE).fill().map(() => Array(N_SIZE).fill(EMPTY));

    // Populate the board
    for (let i = 0; i < N_SIZE; i++) {
        // Create a new row
        let row = [];
        for (let j = 0; j < N_SIZE; j++) {
            // Fill the row with EMPTY values
            row.push(EMPTY);
        }
        // Add the row to the board
        board.push(row);
    }

    // Now `board` is a 3x3 array filled with `EMPTY`
    //console.log(board);

    moves = 0;
    turn = 'X';
    startNewGame();
}

/*
 * New game
 */
function startNewGame() {
    console.log("\nStarting a new game!");
    displayBoard(true); // Show grid numbers at the start
    gameLoop();
}

/*
 * Display the current state of the board
 * If `showGridNumbers` is true, display the grid numbers (1-9) instead of the board contents
 */
function displayBoard(showGridNumbers = false) {
    console.log();
    /*replaced with easier logic with for loop */
    //let displayValues = board.map(row => row.slice());
    
    let displayValues = [];  // Initialize an empty array for the copied board

    for (let i = 0; i < board.length; i++) {
        // Create a new row by copying the elements of the current row
        let newRow = [];
        for (let j = 0; j < board[i].length; j++) {
            newRow.push(board[i][j]);
        }
        // Add the new row to the displayValues array
        displayValues.push(newRow);
    }

    if (showGridNumbers) {
        // Display grid numbers at the start
        displayValues = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
    } else {
        // Replace grid numbers with current board state
        for (let number in gridMapping) {
            let [row, col] = gridMapping[number];
            if (board[row][col] === EMPTY) {
                displayValues[row][col] = number;
            }
        }
    }

    for (let i = 0; i < N_SIZE; i++) {
        console.log(displayValues[i].join(' | '));
        if (i < N_SIZE - 1) {
            console.log('---------');
        }
    }
    console.log();
}

/*
 * Check if a player has won
 */
/*replaced with loop logic*/
// function checkWin() {
//     // Check rows, columns, and diagonals for a win
//     for (let i = 0; i < N_SIZE; i++) {
//         if (board[i].every(cell => cell === turn)) return true; // Check row
//         if (board.map(row => row[i]).every(cell => cell === turn)) return true; // Check column
//     }
//     // Check diagonals
//     if (board.map((row, idx) => row[idx]).every(cell => cell === turn)) return true;
//     if (board.map((row, idx) => row[N_SIZE - idx - 1]).every(cell => cell === turn)) return true;

//     return false;
// }

function checkWin() {
    // Check rows
    for (let i = 0; i < N_SIZE; i++) {
        let win = true;
        for (let j = 0; j < N_SIZE; j++) {
            if (board[i][j] !== turn) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }

    // Check columns
    for (let j = 0; j < N_SIZE; j++) {
        let win = true;
        for (let i = 0; i < N_SIZE; i++) {
            if (board[i][j] !== turn) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }

    // Check diagonal from top-left to bottom-right
    let win = true;
    for (let i = 0; i < N_SIZE; i++) {
        if (board[i][i] !== turn) {
            win = false;
            break;
        }
    }
    if (win) return true;

    // Check diagonal from top-right to bottom-left
    win = true;
    for (let i = 0; i < N_SIZE; i++) {
        if (board[i][N_SIZE - i - 1] !== turn) {
            win = false;
            break;
        }
    }
    if (win) return true;

    // If no win found
    return false;
}


/*
 * Main game loop to handle turns
 */
function gameLoop() {
    while (true) {
        let move = prompt(`Player ${turn}, enter your move (grid number 1-9): `);
        let gridNumber = Number(move);

        // Check if input is valid (number between 1-9)
        if (!Number.isInteger(gridNumber) || gridNumber < 1 || gridNumber > 9) {
            console.log("Invalid input. Please enter a number between 1 and 9.");
            continue;
        }

        // Get the row and column from the grid number
        let [row, col] = gridMapping[gridNumber];

        if (board[row][col] === EMPTY) {
            board[row][col] = turn;
            moves++;
            displayBoard(); // Display the updated board

            if (checkWin()) {
                console.log(`Winner: Player ${turn}`);
                break;
            } else if (moves === N_SIZE * N_SIZE) {
                console.log("It's a draw!");
                break;
            }

            // Switch turns
            turn = turn === 'X' ? 'O' : 'X';
        } else {
            console.log("Invalid move. That grid is already occupied. Please try again.");
        }
    }

    // Ask to play again
    let playAgain = prompt("Do you want to play again? (yes/no): ").toLowerCase();
    if (playAgain === 'yes') {
        init();
    } else {
        console.log("Thanks for playing!");
    }
}

// Start the game
init();
