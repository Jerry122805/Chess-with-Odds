import {validStartSquare, validMove, isCheckmate, checkforCheck} from "./check-move-validity.js"
import {move, highlightSquare, removeHighlight} from "./execute-move.js"
import {recordMove} from "../notation/notation-history.js";
import {startTimer} from "../timer/timer.js";
import {gameFinish} from "../gamefinish.js";

function choseSquare(e){
    //if we haven't chosen a starting square then choose it otherwise we choose an ending square and see if the square works
    if(endSquare){
        removeHighlight(endSquare)
        endSquare = null;
    }
    if(startSquare){
        const color = piecePositions[startSquare][0];
        const piece = piecePositions[startSquare][1];
        endSquare = e.target.id;
        if(validMove(color, piece, startSquare, endSquare, piecePositions)){
            recordMove(color, piece, startSquare, endSquare, piecePositions); //record first b/c movePiece changes Piecepositions and we need piece Positions for recordMove
            move(color, piece, startSquare, endSquare, piecePositions);
            whiteMove = !whiteMove;
            startTimer(whiteMove);
            if(checkforCheck(whiteMove ? 'w' : 'b', piecePositions)){
                if(isCheckmate(whiteMove ? 'w' : 'b', piecePositions)){
                    gameFinish(whiteMove ? 'White' : 'Black', 'been checkmated!');
                }
            }
        }
        removeHighlight(startSquare);
        startSquare = null;
    }

    if(validStartSquare(e, whiteMove, piecePositions)){    
        startSquare = e.target.id;
        highlightSquare(startSquare, "#ffff99");
    }

}


//setting up click feature
let chessSquares = document.getElementsByClassName("square");
for(const squareElem of chessSquares){
    squareElem.addEventListener("click", choseSquare);
}

let whiteMove = true;
let startSquare = null;
let endSquare = null;



export const moveList = [];


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
