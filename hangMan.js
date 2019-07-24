let colors = require('colors');
let figlet = require('figlet');
const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Hangman object that holds dynamic data (based on choice of word) for current game
let hangMan = {
    word: ['HELLO'],
    wordString: 'hello'.green,
    letterBoard: '',
    board: [],
    lives: 6,
    remainingLtr: '',
    prevLetter: [],
    boardPlaceHolder: '',
    letterHistory: [],
    letterBank: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
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
    if (answer === "yes" || answer === "y") {
        console.log("Let's go!".green.bold);
    } else if (answer === "no" || answer === "n") {
        console.log("Well you're already on the death row...I mean winner row.".inverse.bold);
    } else {
        console.log("Guards! Bring him up on stage!".inverse.bold);
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
// Letter bank update
function letterBank(letter) {
    letter = letter.toUpperCase();
    hangMan.letterBank = hangMan.letterBank.filter(ltr => letter != ltr );
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
    letter = letter.toUpperCase();
    if (hangMan.letterHistory.includes(letter) || hangMan.prevLetter.includes(letter)) { // Does nothing if used ltr has been repeated
        console.clear()
        console.log("You've already used that letter, choose another one! ".bold.red);
        // console.log(hangMan.letterBank);
        console.log(hangMan.letterBank.join(" | ".red));
    } else if (hangMan.remainingLtr.includes(letter.toUpperCase())) { // Runs only if the correct letter has been chosen
        // If correct letter, game needs to loop for all occurances of the current letter
        while (hangMan.remainingLtr.includes(letter.toUpperCase())) {
            let index = hangMan.boardPlaceHolder.indexOf(letter); // Static index of the word replacing first Index with "."
            let remainingLtrIndex = hangMan.remainingLtr.indexOf(letter); // Dynamic index of letters remaining, needed for repeated letters
        
            hangMan.letterHistory.push(letter.toUpperCase()); 
            hangMan.boardPlaceHolder[index] = "."; // Updates placeholder array, used for n > 1 of a letter
            hangMan.board[index] = letter.toUpperCase().green;
            hangMan.remainingLtr.splice(remainingLtrIndex, 1); // 
        }
        hangMan.prevLetter.push(letter);
        // console.log(hangMan.letterHistory);
    } else {
        hangMan.lives--;
        bodyPartUpdate();
        hangMan.prevLetter.push(letter);
        // console.log(hangMan.letterHistory);
    }
}
// Main Readline function that updatesGame() and keeps asking for input until win/lose condition has been met
function askAgain() {
    rl.on('line', letter => {
        console.clear();
        letterBank(letter);
        // console.log(hangMan.letterBank);
        console.log(hangMan.letterBank.join(" | ".green));
        updateGame(letter);
        let lives = hangMan.lives.toString();
        displayBoard();
        console.log("Lives Remaining:".inverse.bold, " ".red.inverse + lives.red.inverse.bold + " ".red.inverse.bold);

        if (hangMan.lives < 1) {
            console.log("Game over...the correct word is: ".bold.red, hangMan.word.toString().toUpperCase().bold)
            figlet('Game over!!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data)
            });
            rl.close();
        } else if (hangMan.remainingLtr.length === 0) {
            console.log(`Congratulations! You guessed the word "${hangMan.word}" correct!`.bold.green)
            rl.close();
        }

    });
}

rl.question('Welcome to Hang(Man/Woman)! \nYou know the rules are you ready? ', (answer) => {
    console.clear();
    greeting(answer);
    startGame();
    askAgain();
});