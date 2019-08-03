console.clear();

const readlineSync = require('readline-sync');

// var readlineSync = require('readline-sync'),
//     gameOptions = ['Computer', 'Against a Friend'],
//     index = readlineSync.keyInSelect(gameOptions, 'Who do you want to play against?');

// if (gameOptions[index] === 'Computer' ) {
//     startSinglePlayer();
// } else if (gameOptions[index] === 'Against a Friend') {
//     startMultiplayer();
// } else {
//     console.log('Goodbye!')
// }

// function startSinglePlayer() {console.log("Single")};
// function startMultiplayer() {console.log("Multiplayer")};

// Wait for user's response.

// // Wait for user's response.
// const userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');

// // Handle the secret text (e.g. password).
// const favFood = readlineSync.question('What is your favorite food? ', {
//   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');


// if (readlineSync.keyInYN('Do you want this module?')) {
//   // 'Y' key was pressed.
//   console.log('Installing now...');
//   // Do something...
// } else {
//   // Another key was pressed.
//   console.log('Searching another...');
//   // Do something...
// }


//     animals = ['Lion', 'Elephant', 'Crocodile', 'Giraffe', 'Hippo'],
//     index = readlineSync.keyInSelect(animals, 'Which animal?');
// console.log('Ok, ' + animals[index] + ' goes to your room.');


// TWO PLAYER INTRO & WORD CONFIRMATION
// const playerOneName = readlineSync.question('Player 1 what is your name?\n');
// const playerTwoName = readlineSync.question('Player 2 what is your name?\n');

// const playerOneWord = readlineSync.question(playerOneName + ' choose your word: ', {
//     hideEchoBack: true
// });
// console.log('✅ Word cofirmed for ' + playerOneName);

// const platerTwoWord = readlineSync.question(playerTwoName + ' choose your word: ', {
//     hideEchoBack: true
// });
// console.log('✅ Word confirmed for ' + playerTwoName);
// --------
// const testWord = readlineSync.question('Choose a word:\n').toUpperCase();
// // console.log(testWord);
// const boardspaceDisplay = (word) => {
    
//     for(let i = 0; i < word.length; i++) {

//     }
// }

// let word = "hello"
// let arr = word.split('')
// console.log(arr);

// let board = arr.map(ele => "_")
// console.log(board)

// let boardDisplay = board.join(' ');
// console.log(boardDisplay)



// let gameOne = {

// }

// let gameTwo = {

// }

let str = 'hello'.split('')
let index = str.indexOf('l');
let sliced = str.slice(4,5)
console.log(index)
str[index] = '.';
console.log(str)
console.log(sliced)