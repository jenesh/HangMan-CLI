console.clear();
const readlineSync = require('readline-sync');

const playerOneName = readlineSync.question('Player 1 what is your name?\n');
// const playerTwoName = readlineSync.question('Player 2 what is your name?\n');

const playerOneWord = readlineSync.question(playerOneName + ' choose your word: ', {
    hideEchoBack: true
});
console.log('✅ Word cofirmed for ' + playerOneName);

// const playerTwoWord = readlineSync.question(playerTwoName + ' choose your word: ', {
//     hideEchoBack: true
// });
// console.log('✅ Word confirmed for ' + playerTwoName);

const wordToArr = (word) => word.split('');

const boardLengthArr = (word) => word.map(ele => "_");

const displayBoard = (boardArr) => boardArr.join(' ');

let word = 'hello';
let p1WordArr = wordToArr(word);
let p1BoardLengthArr = boardLengthArr(p1WordArr);
let p1DisplayBoard = displayBoard(p1BoardLengthArr);

// console.log(p1WordArr);
// console.log(p1BoardLengthArr);
console.log(p1DisplayBoard);