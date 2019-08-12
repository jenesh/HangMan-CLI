const fs = require("fs");

let arr = ["hello", "my", "name", "is", "John", "Cena"];

let randomNumber = Math.floor(Math.random() * 6);
// console.log(randomNumber);

// Current state of hangManObj
let hangManObj = {
  word: "hello",
  lives: 6
};

// Function to split string into an array
const splitWordToArr = str => str.split("");
// GOES IN MAIN GAME FUNCTION
// Function to update board array if given string input is in the word array
// const updateArr = (ltr, answerArr, currentArr) => {
//   let ltrCount = 0;
//   if (answerArr.includes(ltr)) {
//     do {
//       console.log(
//         `letter: ${ltr}`,
//         `Answer array: ${answerArr}`,
//         `Current array: ${currentArr}`
//       );
//       updateDynamicArr(ltr, currentArr);
//       updateStaticArr(answerArr);
//       ltrCount++;
//     } while (currentArr.includes(ltr));
//     console.log(`Good guess, there are ${ltrCount} ${ltr}.`);
//   } else {
//     console.log(`Sorry, there are ${ltrCount} ${ltr}.`);
//   }
// };
let givenLtr = "l";
// Function updates the given letter between two arrays
const updateDynamicArr = (arr, ltr) => arr.map(ele => (ele == ltr ? ltr : "_"));
// console.log(arr.map(ele => (ele === "ltr" ? true : false)));

// Function updates static array with a $
const updateStaticArr = (arr, ltr) => arr.map(ele => (ele == ltr ? ltr : "$"));

// Creates an array of the current chosen word
hangManObj.wordArr = splitWordToArr(hangManObj.word);
// Using wordArr creates an array with '_' of same length for the board
hangManObj.boardArr = hangManObj.wordArr.map(ele => "_");
// Updates boardArr if input matches a letter
// hangManObj.boardArr;

// updateArr("l", hangManObj.wordArr, hangManObj.boardArr);
hangManObj.boardArr = hangManObj.wordArr.map(ele =>
  ele === givenLtr ? givenLtr : ele
);
hangManObj.wordArr = hangManObj.boardArr.map(ele =>
  ele === givenLtr ? null : ele
);

console.log(hangManObj.wordArr);
console.log(hangManObj.boardArr);

// let nullArr = [null, null, null];
// console.log(nullArr.every(ele => ele === null));

/*
    < - - - BELOW ARE THE FILE SYSTEM FUNCTIONS - - ->
*/
// let savedHangManObj = null;

// Writes the current hangman object as an JSON string into a file in the same directory
fs.writeFileSync("obj.txt", JSON.stringify(hangManObj), err => {
  if (err) throw error;
  console.log(`copied ${hangManObj}`);
});

const isSaved = fs.openSync("obj.txt");
const loadSavedObject = JSON.parse(fs.readFileSync("obj.txt", "utf8"));

console.log(isSaved);
console.log(loadSavedObject);
// fs.open("obj.txt", "r", (err, fd) => {
//   if (err) {
//     if (err.code === "ENOENT") {
//       console.log("There is no saved game.");
//     }
//   } else {
//     console.log("Loading saved game...");
//   fs.readFile("obj.txt", "utf8", (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       let parsed = JSON.parse(data);
//       console.log(parsed);
//       savedHangManObj = parsed;
//     }
//   });
// }
// });

// console.log(savedHangManObj);
// console.log(savedFile);
/*
    < - - - ALL TESTS GO BELOW THIS - - - >
*/

// const readMe = fs.readFileSync('readMe.txt', 'utf8');
// fs.writeFileSync('writeMe.txt', readMe);

// fs.readFile("readMe.txt", "utf8", function(err, data) {
//   console.log(data);
//   fs.writeFile("writeMe.txt", data, err => {
//     if (err) {
//       throw err;
//     } else {
//       console.log("Saved!");
//     }
//   });
// });

// fs.unlink('writeMe.txt', (err) => {
//     if (err) throw err;
//     console.log('writeMe.txt was deleted.');
// });

// console.log('I go first');

// fs.mkdir('coolFolder', (err) => {
//     if (err) throw err;
//     console.log('New Directory created');
// });

// fs.rmdir('coolFolder', (err) => {
//     if (err) throw err;
// })
