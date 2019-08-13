console.clear();
const game = require("./functions.js");
const rls = require("readline-sync");
const randomWords = require("random-words");
const colors = require("colors");
const fs = require("fs");

// function game() {
//  while (hangManObj.lives || hangManObj.wordArr.every(ele => ele === '$')) {
//
//  }
// }
// Checks if there is a saved file

let hangManObj = {
  word: "hello",
  lives: 6
};

const name = rls.question("Hi, there what is your name?"); // Name used to save file: name.txt

let isSaved = false; // Initilizes as false

try {
  // Try Catch is needed when catching errors for syncronous methods (Took forever to figure out)
  isSaved = fs.openSync(`${name}.txt`);
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}

if (isSaved) {
  const loadGame = rls.question(
    "There seems to be a saved game already.\nDo you want to continue the game? (y/n)"
  );
  if (loadGame.toLowerCase() === "y") {
    hangManObj = JSON.parse(fs.readFileSync("obj.txt", "utf8"));
    console.log(`Welcome back ${name} lets continue the game!`);
  } else if (loadGame.toLowerCase() === "n") {
    console.log(`No problem, lets start a new game!`);
  }
} else {
  console.log(`Lets start a new game ${name}!`);
}

let pressed = rls.question(`Let's try a letter ${name}:`);

while (pressed.match(/[a-Z]/i)) {
  pressed = rls.question(`Let's try a LETTER this time ${name}:`);
}

//
// // Creates an array of the current chosen word
// hangManObj.wordArr = game.splitWordToArr(hangManObj.word);
//
// // Using wordArr creates an array with '_' of same length for the board
// hangManObj.boardArr = hangManObj.wordArr.map(ele => "_");
//
// // Updates both arrays if input matches a letter
// hangManObj.boardArr = hangManObj.wordArr.map(ele =>
//   ele === givenLtr ? givenLtr : ele
// );
//
// hangManObj.wordArr = hangManObj.boardArr.map(ele =>
//   ele === givenLtr ? null : ele
// );
//
// console.log(hangManObj);
// // Creates a file & Saves the hangManObj with the given name
// // fs.writeFileSync(`${name}.txt`, JSON.stringify(hangManObj), err => {
// //   if (err) throw error;
// //   console.log(`Saved ${hangManObj}`);
// // });
