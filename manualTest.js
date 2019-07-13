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

arr.forEach( row => console.log(row.join("")))
