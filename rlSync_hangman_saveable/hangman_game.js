console.clear();
const game = require("./functions.js");
const rls = require("readline-sync");
const randomWords = require("random-words");
const colors = require("colors");
const fs = require("fs");

let name = false;

function startGame() {
  let hangManObj = {};

  if (!name) {
    name = rls.question("Hi, there what is your name?\n"); // Name used to save file: name.txt
  }

  let isSaved = false; // Initilizes as false and is true only if there is a saved file

  try {
    // Try Catch is needed when catching errors for syncronous methods (Took forever to figure out)
    isSaved = fs.openSync(`./savedGames/${name}.txt`);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  console.clear();

  if (isSaved) {
    const loadGame = rls.question(
      "There seems to be a saved game already.\nDo you want to continue the game? (Y/N)\n"
    );

    console.clear();

    if (loadGame.toLowerCase() === "y") {
      hangManObj = JSON.parse(
        fs.readFileSync(`./savedGames/${name}.txt`, "utf8")
      );

      console.log(`Welcome back ${name} lets continue the game!`);
      console.log(game.displayBoardArr(hangManObj.boardArr).join(" "));
      console.log(`You have ${hangManObj.lives} lives remaining.`);
    } else if (loadGame.toLowerCase() === "n") {
      fs.unlinkSync(`./savedGames/${name}.txt`);
      isSaved = false;
      console.log(`No problem, lets start a new game!`);
    }
  } else {
    console.clear();
    console.log(`Lets start a new game ${name}!`);
    console.log(`To save the game anytime just type: .save`);

    // Initilizes the Hangman Object
    hangManObj.word = randomWords({
      exactly: 1,
      min: 5,
      max: 8
    }).toString();
    hangManObj.wordArr = game.splitWordToArr(hangManObj.word);
    hangManObj.boardArr = game.makeBoardArr(hangManObj.wordArr);
    hangManObj.lives = 6;
    hangManObj.lettersUsed = [];
  }

  // console.log(hangManObj);

  let userInput = rls.question(
    isSaved
      ? `You have chosen: (${hangManObj.lettersUsed.join(
          " "
        )}) letters so far. choose your next letter.`
      : `Let's choose your first letter ${name}:\n`
  );

  while (userInput === ".save" && hangManObj.lettersUsed.length === 0) {
    console.log("You cannot save without choosing a letter first!");
    userInput = rls.question(`Choose your first letter please.`);
  }

  // Game keeps running and asking while conditions are true
  while (hangManObj.lives && !game.isSolved(hangManObj.wordArr)) {
    console.clear();
    // Makes sure userInput is only a letter
    let repeatQuestion = `Sorry ${name}, there are no ${userInput.toUpperCase()}'s`;
    // Save when user input is .save
    if (userInput === ".save") {
      // Creates a file & Saves the hangManObj with the given name
      fs.writeFileSync(
        `./savedGames/${name}.txt`,
        JSON.stringify(hangManObj),
        err => {
          if (err) throw error;
          console.log(`Saved ${hangManObj}`);
        }
      );

      console.log(`Your game has been saved as your name: ${name}`);
      console.log(
        `Your game will load next time you start the game with your name.`
      );

      isSaved = true;
      break;
    }

    while (!game.letterCheck(userInput)) {
      userInput = rls.question(`Let's try a LETTER this time ${name}:\n`);
    }

    if (hangManObj.wordArr.includes(userInput)) {
      // Updates both arrays if input matches a letter
      hangManObj.boardArr = game.updateDynamicArr(
        hangManObj.boardArr,
        userInput
      );
      hangManObj.wordArr = game.updateStaticArr(hangManObj.wordArr, userInput);
      hangManObj.lettersUsed.push(userInput.toUpperCase());
      repeatQuestion = `Great guess ${name}! `;
    } else {
      hangManObj.lives--;
    }

    if (!hangManObj.lives) {
      continue;
    }

    if (game.isSolved(hangManObj.wordArr)) {
      console.log(`Congrats, you have won ${name}!`);
      let playAgain = rls.question(`Do you want to play again ${name}? (Y/N)`);
      if (playAgain.toLowerCase() === "y") {
        if (isSaved) {
          fs.unlinkSync(`./savedGames/${name}.txt`);
        }
        startGame();
      } else {
        console.log("Goodbye!");
        break;
      }
    }
    // console.log(hangManObj);

    console.log(game.displayBoardArr(hangManObj.boardArr).join(" "));
    console.log(`You have ${hangManObj.lives} lives remaining.`);
    console.log(`Letters used: ${hangManObj.lettersUsed.join(" ")}`);
    // console.log(hangManObj);
    userInput = rls.question(`${repeatQuestion}\n`);
    // let hangManObj.wordArr.every(ele => ele === '$'))
  }

  if (!hangManObj.lives) {
    // If the user runs out of lives and there is a saved file this will delete the file
    if (isSaved) {
      fs.unlinkSync(`./savedGames/${name}.txt`);
    }

    console.log(`Sorry ${name}, you were not successful this time.`);
    let restart = rls.question(`Would you like to start a new game? (Y/N)`);

    if (restart.toLowerCase() === "y") {
      startGame();
    } else {
      console.log(`Goodbye!`);
    }
  }
}

startGame();
