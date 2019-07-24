let colors = require('colors');
let figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

let hangMan = {
    word: ['hello'],
    letterBoard: '',
    board: [],
};

// console.log(startGame())
// console.log(hangMan.word)
// console.log(hangMan.letterBoard)

function startGame() {
    let word = hangMan.word[0];
    hangMan.letterBoard = word.split('');
    console.log(displayBoard());
}

function displayBoard () {
    let ltrLength = hangMan.letterBoard.length;
    makeBoard(ltrLength);
    console.log(hangMan.board);
}

function makeBoard (length) {
    let i = 0;
    while(length > i) {
        hangMan.board.push('_');
        i++;
    }
    console.log(hangMan.board.join(' '));
}

// console.log(hangMan.word[0].includes("a"))
// startGame()
// makeBoard(5)node
function updateGame (letter) {
    if (hangMan.word[0].includes(letter)) {
        hangMan.word.indexOf(letter);
    }
}
let arr = [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],  
];

arr[0][2] = "O"

arr[1][2] = "|"
arr[2][2] = "|"

arr[3][2] = " "
arr[4][2] = " "

arr[1][1] = "/"
arr[1][3] = `\\`
arr[1][0] = "_"
arr[1][4] = "_"

arr[0][2] = "O"
arr[1][2] = "|"
arr[2][2] = "|"

arr[3][1] = "/"
arr[3][3] = `\\`
arr[4][1] = `\\`
arr[4][3] = "/"
arr[4][0] = "_"
arr[4][4] = "_"

let pushArr = [
    [" ", " ", "O", " ", " "],
    ["_", "/", "X", "\\", "_"],
    [" ", " ", "X", " ", " "],
    [" ", "/", " ", "\\", " "],
    ["_", "\\", " ", "/", "_"],
    ["-", "-", "-", "-", "-"],
]

let newArr = [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],  
];
console.log(pushArr[0])
newArr[0] = pushArr[0];
newArr[0] = pushArr[0];

let i = 1;
if (i === 0) {
    newArr[i] = pushArr[0];
} else if (i === 1) {
    newArr[i] = pushArr[1];
} else if (i === 2) {
    newArr[i] = pushArr[2];
} else if (i === 3) {
    newArr[i] = pushArr[3];
} else if (i === 4) {
    newArr[i] = pushArr[4];
}
newArr.forEach( row => console.log(row.join("")));

// arr.forEach( row => console.log(row.join("")))

// console.log('\x1b[33m%s\x1b[0m: ', "Hell");
// console.log("\x1b[5m", "Hello");
// console.log("\x1b[7m", "Hello ");

let colorMe = ["Game Over" , "Son"]
// colorMe.forEach( (a) => console.log("\x1b[7m", a + " "))

let gameOver = [
    [" ", "-", " ", " ", " "],
    ["|", " ", "|", " ", " "],
    ["|", "_", "_", " ", " "],
    ["|", " ", '|', " ", " "],
    ["\\", "_", "/", " ", " "],  
];

// gameOver.forEach( row => console.log(row.join("")));
// console.log(" GAME OVER ".bgRed)
// console.log(" START ".bgGreen)

let printMe = [
    " ... ", 
    " /  \\",
    "|  __",
    " \\ _ /", 
]

// printMe.forEach( a => console.log(a)); 