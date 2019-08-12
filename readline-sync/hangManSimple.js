console.clear();
const readlineSync = require("readline-sync");
const randomWords = require("random-words");
const colors = require("colors");
const fs = require("fs");

const playerOneName = readlineSync.question("So what is your name?\n");
console.log("That's a decent name, " + playerOneName + ".");
console.log("Let's start!");

// const oneSecDelay = setTimeout(console.log(''), 1000);
// oneSecDelay.clear();

let emptyBoard = [
  [" ", "_", "_", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", " ", " ", " ", " ", " "],
  ["|", "_", "_", "_", "_", "_"]
];

let updateBoard = [
  [" ", "_", "_", " ", " ", " "],
  ["|", " ", " ", "|", " ", " "],
  ["|", " ", " ", "O", " ", " "],
  ["|", "_", "/", "|", "\\", "_"],
  ["|", " ", " ", "|", " ", " "],
  ["|", " ", "/", " ", "\\", " "],
  ["|", "_", "\\", " ", "/", "_"],
  ["|", "_", "_", "_", "_", "_"]
];

let word = randomWords({ exactly: 1, min: 5, max: 8 }).toString();

const wordToArr = word => word.split("");
const boardLengthArr = word => word.map(ele => "_");
const displayBoard = boardArr => boardArr.join(" ");

let p1WordArr = wordToArr(word);

let lives = 6;
let p1WordToArr = wordToArr(word);
// let avaliable.letter
let p1BoardLengthArr = boardLengthArr(p1WordArr);
let avaliableLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "e",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
let p1DisplayBoard = displayBoard(p1BoardLengthArr);

const bodyPartUpdate = () => {
  let i = 7 - lives;
  if (i === 6) {
    emptyBoard[i] = updateBoard[i];
    emptyBoard[2][3] = "O".red;
  } else {
    emptyBoard[i] = updateBoard[i];
  }
  // i++;
};

while (lives) {
  let statement;
  const currentLetter = readlineSync.question("Choose a Letter: ");
  const indexLtr = avaliableLetters.indexOf(currentLetter);
  if (currentLetter === word) {
    console.log(`Well  💩 you guessed the whole word 👍`);
    break;
  } else if (!avaliableLetters.includes(currentLetter)) {
    console.log("You've already guessed that letter try a different one!");
    continue;
  } else if (p1WordToArr.includes(currentLetter)) {
    while (p1WordToArr.includes(currentLetter)) {
      let index = p1WordToArr.indexOf(currentLetter);
      console.log("Index: ", index);
      p1WordToArr[index] = ".";
      p1BoardLengthArr[index] = currentLetter;
      statement = `Great guess ${playerOneName}!`;
      avaliableLetters[indexLtr] = " ";
    }
    console.log("Yes");
  } else {
    statement = `That's fine keep on going ${playerOneName}!`;
    avaliableLetters[indexLtr] = " ";
    bodyPartUpdate();
    lives--;
  }
  if (lives === 0) {
    statement = `Damn ${
      word.toUpperCase().bold.green
    } is a hard word to guess...I guess.\nDon't worry. You'll get it next time! 🤞`;
  }
  console.clear();
  console.log(statement);
  p1DisplayBoard = displayBoard(p1BoardLengthArr);
  emptyBoard.forEach(ele => console.log(ele.join("")));
  console.log(p1DisplayBoard.toUpperCase());
  console.log(lives);
  console.log(avaliableLetters.join(" | ").toUpperCase());
}
