import {hasMoved} from "../notation/notation-history.js";

export let isCastling = false;
let isEnPassant = false;

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

export function noLongerCastling(){
    isCastling = false;
}

function canCastle(color, piece, startSquare, endSquare, piecePositions){
    if(color === 'w'){
        if(hasMoved['e1'] || startSquare !== 'e1'){
            return false;
        }

        if(endSquare === 'g1'){
            if(hasMoved['h1'] || !willNotBeInCheck(color, piece, startSquare, 'f1', piecePositions) || !willNotBeInCheck(color, piece, startSquare, 'g1', piecePositions) || !pieceNotBlocked(color, piece, startSquare, 'g1', piecePositions)){
                return false;
            }
        }
        else if(endSquare === 'c1'){
            if(hasMoved['a1'] || !willNotBeInCheck(color, piece, startSquare, 'd1', piecePositions) || !willNotBeInCheck(color, piece, startSquare, 'c1', piecePositions) || !pieceNotBlocked(color, piece, startSquare, 'c1', piecePositions)){
                return false;
            }
        }
        else{
            return false;
        }

    }else{
        if(hasMoved['e8'] || startSquare !== 'e8'){
            return false;
        }

        if(endSquare === 'g8'){
            if(hasMoved['h8'] || !willNotBeInCheck(color, piece, startSquare, 'f8', piecePositions) || !willNotBeInCheck(color, piece, startSquare, 'g8', piecePositions) || !pieceNotBlocked(color, piece, startSquare, 'g8', piecePositions)){
                return false;
            }
        }
        else if(endSquare === 'c8'){
            if(hasMoved['a8'] || !willNotBeInCheck(color, piece, startSquare, 'd8', piecePositions) || !willNotBeInCheck(color, piece, startSquare, 'c8', piecePositions) || !pieceNotBlocked(color, piece, startSquare, 'c8', piecePositions)){
                return false;
            }
        }
        else{
            return false;
        }
    }
    if(inCheck(color, piecePositions)){
        return false;
    }

    isCastling = true;
    return true;
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
            if(absChangeX === 1 && changeY === 1){
                if(piecePositions[endSquare]){
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
            if(absChangeX === 1 && changeY === -1){
                if(piecePositions[endSquare]){
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
        if(validPieceMove(color, 'r', startSquare, endSquare, piecePositions) || validPieceMove(color, 'b', startSquare, endSquare, piecePositions)){
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
        return canCastle(color, piece, startSquare, endSquare, piecePositions);
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


    let tempSquare = startSquare;

    function stepX(){
    }
    if(changeX > 0){
        stepX = () => {tempSquare = String.fromCharCode(tempSquare[0].charCodeAt(0)+1) + tempSquare[1];}
    }
    else if(changeX < 0){
        stepX = () => {tempSquare = String.fromCharCode(tempSquare[0].charCodeAt(0)-1) + tempSquare[1];}
    }

    function stepY(){
    }
    if(changeY > 0){
        stepY = () => {tempSquare = tempSquare[0] + (Number(tempSquare[1])+1);}
    }
    else if(changeY < 0){
        stepY = () => {tempSquare = tempSquare[0] + (Number(tempSquare[1])-1);}
    }
    
    if(piece === 'p' && changeX === 0){
        while(tempSquare !== endSquare){
            stepY();
            if(piecePositions[tempSquare]){
                return false;
            }
        }
        return true;
    }

    stepX();
    stepY();

    while(tempSquare !== endSquare){
        if(piecePositions[tempSquare]){
            return false;
        }
        stepX();
        stepY();
    }
    return true;
}

export function findKingPosition(color, piecePositions){
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(piecePositions[i+j] === color + 'k'){
                return i+j;
            }
        }
    }
}

export function inCheck(color, piecePositions){
    const kingPosition = findKingPosition(color, piecePositions);
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(!piecePositions[i+j] || piecePositions[i+j][0] === color){
                continue;
            }
            const pieceColor = piecePositions[i+j][0];
            const piece = piecePositions[i+j][1];

            if(validPieceMove(pieceColor, piece, i+j, kingPosition, piecePositions) && pieceNotBlocked(pieceColor, piece, i+j, kingPosition, piecePositions)){
                if(piece === 'p' && j === kingPosition[1]){
                    continue;
                }
                return true;
            }
        }
    }
    return false;
}

function willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions){
    let newPiecePositions = JSON.parse(JSON.stringify(piecePositions));
    delete newPiecePositions[startSquare];
    newPiecePositions[endSquare] = color + piece;    
    return !inCheck(color, newPiecePositions);
}


export function validMove(color, piece, startSquare, endSquare, piecePositions){
    return validPieceMove(color, piece, startSquare, endSquare, piecePositions) && pieceNotBlocked(color, piece, startSquare, endSquare, piecePositions) && willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions);
}