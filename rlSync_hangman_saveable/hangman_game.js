console.clear();
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
isSaved = fs.openSync(`${name}.txt`);

if (isSaved) {
  const loadGame = rls.question(
    "There seems to be a saved game already.\nDo you want to continue the game? (y/n)"
  );
  if (loadGame.toLowerCase() === "y") {
    hangManObj = JSON.parse(fs.readFileSync("obj.txt", "utf8"));
    console.log(`Welcome back ${name} lets continue the game!`);
  }
} else {
  console.log(`No problem, lets start a new game!`);
}

// Creates a file & Saves the hangManObj with the given name
// fs.writeFileSync(`${name}.txt`, JSON.stringify(hangManObj), err => {
//   if (err) throw error;
//   console.log(`Saved ${hangManObj}`);
// });
