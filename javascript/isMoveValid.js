export function validStartSquare(e, whiteMove, piecePositions){
    const squareName = e.target.id;
    if(piecePositions[squareName]){
        if(piecePositions[squareName][0] === 'w' && whiteMove){
            return true;
        }
        else if(piecePositions[squareName][0]==='b' && !whiteMove){
            return true;
        }
    }
    return false;
}


export function validPieceMove(color, piece, startSquare, endSquare){
    const changeX = endSquare[0].charCodeAt(0)-startSquare[0].charCodeAt(0);
    const changeY = Number(endSquare[1]) - Number(startSquare[1]);
    const absChangeX = Math.abs(changeX);
    const absChangeY = Math.abs(changeY);
    if(piece === 'p'){
        if(color === 'w'){
            if(absChangeX === 1 || changeY === 1){
                if(piecePositions[endSquare][0] === 'b'){
                    return true;
                }
            }
            else if(changeX === 0){
                if(changeY === 1){
                    return true;
                }
                else if(changeY === 2 && Number(startSquare[1]) === 2){
                    return true;
                }
                }
            return false;
            }
        else{
            if(absChangeX === 1 || changeY === -1){
                if(piecePositions[endSquare][0] === 'w'){
                    return true;
                }
            }
            else if(changeX === 0){
                if(changeY === -1){
                    return true;
                }
                else if(changeY === -2 && Number(startSquare[1]) === 7){
                    return true;
                }
                }
            return false;
        }
        
    }
    else if(piece === 'b'){
        if(absChangeX === absChangeY){
            return true;
        }
    }
    else if(piece === 'n'){
        if((absChangeX === 2 && absChangeY === 1) || (absChangeX === 1 && absChangeY === 2)){
            return true;
        }
    }
    else if(piece === 'q'){
        if(validMove('r') || validMove('b')){
            return true;
        }
    }
    else if(piece == 'r'){
        if(!absChangeX || !absChangeY){
            return true;
        }

    } else{
        if(absChangeX === 1 || absChangeY === 1){
            return true;
        }
    }
}