const splitWordToArr = str => str.split("");

// Updates the given letter between two arrays
const updateDynamicArr = (arr, ltr) => arr.map(ele => (ele == ltr ? ltr : "_"));
// console.log(arr.map(ele => (ele === "ltr" ? true : false)));

// Updates static array with a $
const updateStaticArr = (arr, ltr) => arr.map(ele => (ele == ltr ? ltr : "$"));

module.exports = {
  splitWordToArr: splitWordToArr,
  updateDynamicArr: updateDynamicArr,
  updateStaticArr: updateStaticArr
};
