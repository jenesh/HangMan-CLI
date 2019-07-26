let colors = require('colors');
let figlet = require('figlet');
let randomWords = require('random-words');

const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let hangMan = {
    word: '',
    wordString: '',
    letterBoard: '',
    board: [],
    lives: 6,
    remainingLtr: '',
    prevLetter: [],
    boardPlaceHolder: '',
    letterBank: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    letterHistroy: [],
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
}

const greeting = (answer) => {
    answer.toLowerCase();
    if (answer === 'yes' || answer === 'y') {
        console.log('Let\' start!'.green.bold);
    } else if (answer === 'no' || answer === 'n') {
        console.log('Let\'s start anyway!'.inverse.bold);
    } else {
        console.log('Hmm...let\'s start anyways!'.inverse.bold);
    }
        
};

const startGame = () => {
    let word = randomWords();
    word = word.toUpperCase();
    hangMan.word = word;
    hangMan.wordString = word;

    hangMan.letterBoard = word.split('');
    hangMan.remainingLtr = word.split('');
    hangMan.boardPlaceHolder = word.split('');

    let boardLength = hangMan.word.length;
    // hangMan.lives = boardLength;
    makeBoard(boardLength);

    displayBoard();
    console.log(word)
}

const makeBoard = (length) => {
    let i = 0;
    while(length > i) {
        hangMan.board.push('_');
        i++;
    }
}

const displayBoard = () => {
    hangMan.graphic.forEach(col => console.log(col.join('')));
    console.log(hangMan.board.join(' '));
}

const letterBank = (letter) => {
    letter = letter.toUpperCase();
    hangMan.letterBank = hangMan.letterBank.filter(ltr => letter != ltr);
}

const bodyPartUpdate = () => {
    let i = 6 - hangMan.lives;
    if (i === 6) {
        hangMan.graphic[i] = hangMan.graphicUpdate[i];
        hangMan.graphic[2][3] = 'O'.red;
    } else {
        hangMan.graphic[i] = hangMan.graphicUpdate[i];
    }
    i++;
}

const updateGame = (letter) => {
    letter = letter.toUpperCase();
    if (letter.length > 1) {
        // IF YOU CHOOSE MORE THAN ONE LETTER
        console.clear();
        console.log('Hey! You can only pick one letter, no cheating!'.bold.red);
        console.log(hangMan.letterBank.join("|".bold.red));
    } else if (hangMan.letterHistroy.includes(letter) || hangMan.prevLetter.includes(letter)) {
        // IF LETTER CHOSEN HAS ALREADY BEEN CHOSEN
        console.clear();
        console.log('You\' already used that letter, choose another one!'.bold.red);
        console.log(hangMan.letterBank.join(" | ".red));
    } else if (hangMan.remainingLtr.includes(letter)) {
        // MAKES SURE IT COUNTS FOR EVERY LETTER THAT GETS REPEATED
        while (hangMan.remainingLtr.includes(letter)) {
            let index = hangMan.boardPlaceHolder.indexOf(letter);
            let remainingLtrIndex = hangMan.remainingLtr.indexOf(letter);

            hangMan.letterHistroy.push(letter);
            hangMan.boardPlaceHolder[index] = ".";
            hangMan.board[index] = letter.green;
            hangMan.remainingLtr.splice(remainingLtrIndex, 1);
        }
        hangMan.prevLetter.push(letter);
    } else {
        // IF CHOSEN LETTER IS NOT IN THE WORD
        hangMan.lives--;
        bodyPartUpdate();
        hangMan.prevLetter.push(letter);
    }
}

const askAgain = () => {
    rl.on('line', letter => {
        console.clear();
        letterBank(letter);
        console.log(hangMan.letterBank.join(" | ".red.bold));
        updateGame(letter);
        let lives = hangMan.lives.toString();
        displayBoard();
        console.log("Lives Remaining:".inverse.bold, " ".red.inverse + lives.red.inverse.bold + " ".red.inverse.bold);

        if (hangMan.lives < 1) {
            console.log("Game over...the correct word is: ".bold.red, hangMan.word.toString().toUpperCase().bold)
            figlet('Game over!!!', function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data)
            });
            rl.close();
        } else if (hangMan.remainingLtr.length === 0) {
            let congrats = 'Congratulations! You guessed the word'.rainbow + '" '.white + hangMan.word.green.inverse.bold + ' "'.white + "correct!".rainbow;
            console.log(congrats.bold)
            rl.close();
        }
    });
}

rl.question('Welcome to Hangman!\nYou know the rules so are you ready? (y/n)\n', (answer) => {
    console.clear();
    greeting(answer);
    startGame();
    askAgain();
});

