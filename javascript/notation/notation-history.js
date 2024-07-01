const moveList = [];

hasMoved = {
    
}

export function recordMove(color, piece, startSquare, endSquare, piecePositions){
    if(piecePositions[endSquare]){
        moveList.push(piece.toUpperCase() + 'x' + endSquare);
    }
    else{
        moveList.push(piece.toUpperCase() + endSquare);
    }

    if(!hasMoved[startSquare]){
        hasMoved[startSquare] = true;
    }
    console.log(moveList);
}

