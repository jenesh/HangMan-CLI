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

let hangManObj = {};

const name = rls.question("Hi, there what is your name?\n"); // Name used to save file: name.txt

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
  // Initilizes the Hangman Object
  hangManObj.word = randomWords({
    exactly: 1,
    min: 5,
    max: 8
  }).toString();
  hangManObj.wordArr = game.splitWordToArr(hangManObj.word);
  hangManObj.boardArr = game.makeBoardArr(hangManObj.wordArr);
  hangManObj.lives = 6;

}

console.log(hangManObj);

let userInput = rls.question(`Let's choose your first letter ${name}:\n`);

// Game keeps running and asking while conditions are true
while (hangManObj.lives || !game.isSolved(hangManObj.wordArr)) {
  // Makes sure userInput is only a letter
  let repeatQuestion = `Sorry ${name}, there are no ${userInput.toUpperCase()}'s`;
  while (!game.letterCheck(userInput)) {
    userInput = rls.question(`Let's try a LETTER this time ${name}:\n`);
  }

  if (hangManObj.wordArr.includes(userInput)) {
    // Updates both arrays if input matches a letter
    hangManObj.boardArr = game.updateDynamicArr(hangManObj.boardArr, userInput);
    hangManObj.wordArr = game.updateStaticArr(hangManObj.wordArr, userInput);
    repeatQuestion = `Great guess ${name}! `;
  } else {
    hangManObj.lives--;
  }
  // console.log(hangManObj);
  console.log(game.displayBoardArr(hangManObj.boardArr));
  console.log(`You have ${hangManObj.lives} lives remaining.`);
  console.log(hangManObj)
  userInput = rls.question(`${repeatQuestion}\n`);
  // let hangManObj.wordArr.every(ele => ele === '$'))
}



// console.log(hangManObj);
// // Creates a file & Saves the hangManObj with the given name
// // fs.writeFileSync(`${name}.txt`, JSON.stringify(hangManObj), err => {
// //   if (err) throw error;
// //   console.log(`Saved ${hangManObj}`);
// // });