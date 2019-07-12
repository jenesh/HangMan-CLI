const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let hangMan = {
    word: ['hello'],
    letterBoard: '',
    board: [],
    lives: 0,
};

function greeting (answer) {
    answer.toLowerCase();
    if (answer === "yes") {
        console.log("Let's go!");
    } else if (answer === "no") {
        console.log("Well you're already on the death row...I mean winner row.");
    } else {
        console.log("Guards! Bring him up on stage!")
    }
}

function startGame() {
    // wordGenerator();
    let word = hangMan.word[0];
    hangMan.letterBoard = word.split('');
    let counter = hangMan.letterBoard.length;
    hangMan.lives = counter;
    makeBoard(counter);
    displayBoard();
}
// Only used once to make board
function makeBoard (length) {
    let i = 0;
    while(length > i) {
        hangMan.board.push('_');
        i++;
    }
}
// Used to display after every input
function displayBoard () {
    console.log(hangMan.board.join(' '));
}

function updateGame (letter) {

}
// Main function that loops the game
function askAgain() {
    rl.on('line', letter => {
        if (hangMan.lives === 0) {
            console.log("You lose your body but, I guess you can keep your soul.")
            rlclose();
        } else if (hangMan.board.length === 0) {
            console.log("Congratulations! It's your lucky day!")
        } else {
            updateGame(letter);
            askAgain();
        }
    });
}

rl.question('Welcome to Hang(Man/Woman)! \nYou know the rules are you ready? ', (answer) => {
    greeting(answer);
    startGame();
    askAgain();
});