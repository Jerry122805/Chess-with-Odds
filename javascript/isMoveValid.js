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


function validPieceMove(color, piece, startSquare, endSquare, piecePositions){
    if(startSquare === endSquare){
        return false;
    }
    const changeX = endSquare[0].charCodeAt(0)-startSquare[0].charCodeAt(0);
    const changeY = Number(endSquare[1]) - Number(startSquare[1]);
    const absChangeX = Math.abs(changeX);
    const absChangeY = Math.abs(changeY);
    if(piece === 'p'){
        if(color === 'w'){
            if(absChangeX === 1 || changeY === 1){
                if(!piecePositions[endSquare]){
                    return piecePositions[endSquare][0] === 'b';
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
                if(!piecePositions[endSquare]){
                    return piecePositions[endSquare][0] === 'w';
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
        if(validPieceMove('r') || validPieceMove('b')){
            return true;
        }
    }
    else if(piece === 'r'){
        if(!absChangeX || !absChangeY){
            return true;
        }

    } else{
        if(absChangeX === 1 || absChangeY === 1){
            return true;
        }
    }
}

function pieceNotBlocked(color, piece, startSquare, endSquare, piecePositions){
    if(piecePositions[endSquare] && piecePositions[endSquare][0] === color){
        return false;
    }
    if(piece === 'n'){
        return true;
    }

    const changeX = endSquare[0].charCodeAt(0)-startSquare[0].charCodeAt(0);
    const changeY = Number(endSquare[1]) - Number(startSquare[1]);


    function stepX(){
    }
    if(changeX > 0){
        stepX = () => {startSquare = String.fromCharCode(startSquare[0].charCodeAt(0)+1) + startSquare[1];}
    }
    else if(changeX < 0){
        stepX = () => {startSquare = String.fromCharCode(startSquare[0].charCodeAt(0)-1) + startSquare[1];}
    }

    function stepY(){
    }
    if(changeY > 0){
        stepY = () => {startSquare = startSquare[0] + (Number(startSquare[1])+1);}
    }
    else if(changeY < 0){
        stepY = () => {startSquare = startSquare[0] + (Number(startSquare[1])-1);}
    }

    stepX();
    stepY();

    while(startSquare !== endSquare){
        if(piecePositions[startSquare]){
            return false;
        }
        stepX();
        stepY();
    }
    return true;
}

function findKingPosition(color, piecePositions){
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(piecePositions[i+j] === color + 'k'){
                return i+j;
            }
        }
    }
}

function inCheck(color, piecePositions){
    const kingPosition = findKingPosition(color, piecePositions);
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(!piecePositions[i+j] || piecePositions[i+j][0] === color){
                continue;
            }
            const pieceColor = piecePositions[i+j][0];
            const piece = piecePositions[i+j][1];

            if(validPieceMove(pieceColor, piece, i+j, kingPosition, piecePositions) && pieceNotBlocked(pieceColor, piece, i+j, kingPosition, piecePositions)){
                return true;
            }
        }
    }
    return false;
}

function willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions){
    delete piecePositions[startSquare];
    piecePositions[endSquare] = color + piece;
    return !inCheck(color, piecePositions);
}

export function validMove(color, piece, startSquare, endSquare, piecePositions){
    return validPieceMove(color, piece, startSquare, endSquare, piecePositions) && pieceNotBlocked(color, piece, startSquare, endSquare, piecePositions) && willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions);
}