import {isCastling} from "../chessboard/check-move-validity.js";

const moveList = [];
export const hasMoved = {
}

function isACapture(color, piece, startSquare, endSquare, piecePositions){
    return piecePositions[endSquare];
}

export function recordMove(color, piece, startSquare, endSquare, piecePositions){
    let currMove;
    if(isCastling){
        if(endSquare === 'g1' || endSquare === 'g8'){
            currMove = '0-0';
        }
        else{
            currMove = '0-0-0';
        }
    }
    else{
        currMove = piece.toUpperCase() + endSquare;
    }

    if(isACapture(color, piece, startSquare, endSquare, piecePositions)){
        currMove = piece.toUpperCase() + 'x' + endSquare;
    }


    moveList.push(currMove);

    if(!hasMoved[startSquare]){
        hasMoved[startSquare] = true;
    }
    console.log(moveList);
}

