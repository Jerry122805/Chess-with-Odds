import {validStartSquare, validMove} from "./isMoveValid.js"

function choseSquare(e){
    //if we haven't chosen a starting square then choose it otherwise we choose an ending square and see if the square works
    if(startSquare){
        const color = piecePositions[startSquare][0];
        const piece = piecePositions[startSquare][1];
        endSquare = e.target.id;
        console.log(endSquare);
        if(validMove(color, piece, startSquare, endSquare, piecePositions)){
            whiteMove = !whiteMove;
        }
        //if move isn't valid then we reset anyways
        startSquare = null;
        endSquare = null;
        return;
    }
    else if(!validStartSquare(e, whiteMove, piecePositions)){
        return;
    }
    startSquare = e.target.id;
    console.log(startSquare);
}

//setting up click feature
let chessSquares = document.getElementsByTagName("div");
for(let i = 1; i <= 64; i++){
    chessSquares[i].addEventListener("click", choseSquare)
}

let whiteMove = true;
let startSquare = null;
let endSquare = null;


let piecePositions = {
    a1: "wr",
    b1: "wn",
    c1: "wb",
    d1: "wq",
    e1: "wk",
    f1: "wb",
    g1: "wn",
    h1: "wr",
    a2: "wp",
    b2: "wp",
    c2: "wp",
    d2: "wp",
    e2: "wp",
    f2: "wp",
    g2: "wp",
    h2: "wp",
    
    a8: "br",
    b8: "bn",
    c8: "bb",
    d8: "bq",
    e8: "bk",
    f8: "bb",
    g8: "bn",
    h8: "br",
    a7: "bp",
    b7: "bp",
    c7: "bp",
    d7: "bp",
    e7: "bp",
    f7: "bp",
    g7: "bp",
    h7: "bp",
}
