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
// startGame()
// makeBoard(5)