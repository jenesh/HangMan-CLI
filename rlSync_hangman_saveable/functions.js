// Splits string word into an array word
const splitWordToArr = str => str.split("");

// 
const makeBoardArr = str => str.map(ele => ele);

// Updates the given letter between two arrays
const updateDynamicArr = (arr, ltr) => arr.map(ele => (ele.toLowerCase() === ltr ? `${ele.toUpperCase()}` : ele));
// console.log(arr.map(ele => (ele === "ltr" ? true : false)));

// Updates static array with a $
const updateStaticArr = (arr, ltr) => arr.map(ele => (ele === ltr ? "$" : `${ele}`));

// Checks if input is a valid letter
const letterCheck = (char) => char.match(/[a-z]/i);

// Display's ("_")'s if the board array elements are lower case
const displayBoardArr = arr => arr.map(ele => ele === ele.toLowerCase() ? '_' : ele);

// Check if every element is '$'
const isSolved = arr => arr.every(ele => ele === '$');

module.exports = {
  splitWordToArr: splitWordToArr,
  makeBoardArr: makeBoardArr,
  updateDynamicArr: updateDynamicArr,
  updateStaticArr: updateStaticArr,
  letterCheck: letterCheck,
  displayBoardArr: displayBoardArr,
  isSolved: isSolved
};
