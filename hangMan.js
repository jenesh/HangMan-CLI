let colors = require('colors');
const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Hangman object that holds dynamic data (based on choice of word) for current game
let hangMan = {
    word: ['hello'],
    wordString: 'hello'.green,
    letterBoard: '',
    board: [],
    lives: 6,
    remainingLtr: '',
    boardPlaceHolder: '',
    letterHistory: [],
    graphic: [
        [" ", "_", "_", " ", " ", " "],
        ["|", " ", " ", "|", " ", " "],
        ["|", " ", " ", " ", " ", " "],
        ["|", " ", " ", " ", " ", " "],
        ["|", " ", " ", " ", " ", " "],
        ["|", " ", " ", " ", " ", " "],
        ["|", " ", " ", " ", " ", " "],
        ["|", "_", "_", "_", "_", "_"],

    ],
    // graphicUpdate: [
    //     [" ", "_", "_", " ", " ", " "],  
    //     ["|", " ", "||", " ", " "],  
    //     ["|", " ", "💀", " ", " "],
    //     ["|", "_", "/", "|", "\\", "_"],
    //     ["|", " ", " ", "|", " ", " "],
    //     ["|", " ", "/", " ", "\\", " "],
    //     ["|", "_", "\\", " ", "/", "_"],
    //     ["|", "_", "_", "_", "_", "_"],
    // ],
    graphicUpdate: [
        [" ", "_", "_", " ", " ", " "],  
        ["|", " ", " ", "|", " ", " "],  
        ["|", " ", " ", "O", " ", " "],
        ["|", "_", "/", "|", "\\", "_"],
        ["|", " ", " ", "|", " ", " "],
        ["|", " ", "/", " ", "\\", " "],
        ["|", "_", "\\", " ", "/", "_"],
        ["|", "_", "_", "_", "_", "_"],
    ],
};
// Simple greeting that ask if the user is ready but will start the game no matter the answer
function greeting (answer) {
    answer.toLowerCase();
    if (answer === "yes") {
        console.log("Let's go!".green.bold);
    } else if (answer === "no") {
        console.log("Well you're already on the death row...I mean winner row.");
    } else {
        console.log("Guards! Bring him up on stage!")
    }
}
// Starts the game and makes the board by choosing word then ltr: board, bank, boardPlaceHolder
function startGame() {
    // wordGenerator();
    let word = hangMan.word[0];
    hangMan.letterBoard = word.split('');
    hangMan.remainingLtr = word.split('');
    hangMan.boardPlaceHolder = word.split('');

    let counter = hangMan.letterBoard.length;
    hangMan.lives = counter;
    makeBoard(counter);

    displayBoard();
}
// Only used once to make board dynamically by pushing "_" to an array depending on the length of the word
function makeBoard (length) {
    let i = 0;
    while(length > i) {
        hangMan.board.push('_');
        i++;
    }
}
// Used to display after every input
function displayBoard () {
    hangMan.graphic.forEach(col => console.log(col.join('')));
    console.log(hangMan.board.join(' '));
}
// Main function that updates the game and is run on every 'line'/return command until win/lose condition has been met
function bodyPartUpdate() {
    let i = 6 - hangMan.lives;
    if (i === 6) {
        hangMan.graphic[i] = hangMan.graphicUpdate[i];
        // hangMan.graphic[1][2] = "⛓";
        // hangMan.graphic[2][2] = "💀";
        hangMan.graphic[2][3] = "O".red;
        // hangMan.graphic[2][3] = "";

    } else {
        hangMan.graphic[i] = hangMan.graphicUpdate[i];
    }
    i++;
}
// Updates the body part display
function updateGame (letter) {
    if (hangMan.letterHistory.includes(letter)) { // Does nothing if used ltr has been repeated
        console.log("You've already used that letter, choose another one: ");
    } else if (hangMan.remainingLtr.includes(letter)) { // Runs only if the correct letter has been chosen
        // If correct letter, game needs to loop for all occurances of the current letter
        while (hangMan.remainingLtr.includes(letter)) {
            let index = hangMan.boardPlaceHolder.indexOf(letter); // Static index of the word replacing first Index with "."
            let remainingLtrIndex = hangMan.remainingLtr.indexOf(letter); // Dynamic index of letters remaining, needed for repeated letters
        
            hangMan.letterHistory.push(letter); 
            hangMan.boardPlaceHolder[index] = "."; // Updates placeholder array, used for n > 1 of a letter
            hangMan.board[index] = letter.green;
            hangMan.remainingLtr.splice(remainingLtrIndex, 1); // 
        }
        console.log(hangMan.letterHistory);
    } else {
        hangMan.lives--;
        bodyPartUpdate();
        console.log(hangMan.letterHistory);
    }
}
// Main Readline function that updatesGame() and keeps asking for input until win/lose condition has been met
function askAgain() {
    rl.on('line', letter => {
        updateGame(letter);
        let lives = hangMan.lives.toString();
        console.log("Lives Remaining:".inverse.bold, " ".red.inverse + lives.red.inverse.bold + " ".red.inverse.bold);

        if (hangMan.lives < 1) {
            
            console.log("You lose your body but, I guess you can keep your soul. 😂".bold.red)
            rl.close();
        } else if (hangMan.remainingLtr.length === 0) {
            console.log(`Congratulations! You guessed the word "${hangMan.word}" correct!`.bold.green)
            rl.close();
        }

        displayBoard();
    });
}

rl.question('Welcome to Hang(Man/Woman)! \nYou know the rules are you ready? ', (answer) => {
    greeting(answer);
    startGame();
    askAgain();
});