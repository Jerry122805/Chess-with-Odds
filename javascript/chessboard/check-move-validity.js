import {hasMoved} from "../notation/notation-history.js";

export let isCastling = false;
let isEnPassant = false;

//stuff checking castling
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
export function noLongerCastling(){
    isCastling = false;
}

//stuff checking individual piece moves
function validPieceDirection(color, piece, startSquare, endSquare, piecePositions){
    if(endSquare.charCodeAt(0) < 'a'.charCodeAt(0) || endSquare.charCodeAt(0) > 'h'.charCodeAt(0) || Number(endSquare[1]) < 1 || Number(endSquare[1]) > 8){
        return false;
    }
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
        if(validPieceDirection(color, 'r', startSquare, endSquare, piecePositions) || validPieceDirection(color, 'b', startSquare, endSquare, piecePositions)){
            return true;
        }
    }
    else if(piece === 'r'){
        if(!absChangeX || !absChangeY){
            return true;
        }

    } else{
        if(absChangeX <= 1 && absChangeY <= 1){
            return true;
        }
        else if(absChangeX === 2 && absChangeY === 0){
            return canCastle(color, piece, startSquare, endSquare, piecePositions);
        }
        return false;
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
function validPieceMove(color, piece, startSquare, endSquare, piecePositions){
    return (validPieceDirection(color, piece, startSquare, endSquare, piecePositions) && pieceNotBlocked(color, piece, startSquare, endSquare, piecePositions));
}


//stuff related to checks
export function findKingPosition(color, piecePositions){
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(piecePositions[i+j] === color + 'k'){
                return i+j;
            }
        }
    }
}
let checkPieceColor;
let checkPiece;
let checkPieceSquare;
let checkKingPosition;

export function inCheck(color, piecePositions){
    const kingPosition = findKingPosition(color, piecePositions);
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(!piecePositions[i+j] || piecePositions[i+j][0] === color){
                continue;
            }
            const pieceColor = piecePositions[i+j][0];
            const piece = piecePositions[i+j][1];

            if(validPieceMove(pieceColor, piece, i+j, kingPosition, piecePositions)){
                return true;
            }
        }
    }
    return false;
}

export function checkforCheck(color, piecePositions){
    const kingPosition = findKingPosition(color, piecePositions);
    for(let i = 'a'; i !== 'i'; i = String.fromCharCode(i.charCodeAt(0)+1)){
        for(let j = 1; j !== 9; j++){
            if(!piecePositions[i+j] || piecePositions[i+j][0] === color){
                continue;
            }
            const pieceColor = piecePositions[i+j][0];
            const piece = piecePositions[i+j][1];

            if(validPieceMove(pieceColor, piece, i+j, kingPosition, piecePositions)){
                checkPieceColor = pieceColor;
                checkPiece = piece;
                checkPieceSquare = i+j;
                checkKingPosition = kingPosition;
                return true;
            }
        }
    }
    return false;
}


function kingCanEscape(color, piecePositions){
    let column = checkKingPosition.charCodeAt(0);
    let row = Number(checkKingPosition[1]);
    return validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + (row-1), piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + row, piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + (row+1), piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column) + (row+1), piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + (row+1), piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + row, piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + (row-1), piecePositions) || validMove(color, 'k', checkKingPosition, String.fromCharCode(column) + (row-1), piecePositions); 
    /* if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + (row-1), piecePositions)){
        alert("1");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + row, piecePositions)){
        alert("2");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column-1) + (row+1), piecePositions)){
        alert("3");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column) + (row+1), piecePositions)){
        alert("4");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + (row+1), piecePositions)){
        alert("5");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + row, piecePositions)){
        alert("6");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column+1) + (row-1), piecePositions)){
        alert("7");
        return true;
    }
    else if(validMove(color, 'k', checkKingPosition, String.fromCharCode(column) + (row-1), piecePositions)){
        console.log(color);
        console.log(String.fromCharCode(column) + (row-1));
        console.log(piecePositions);
        return true;
    }
        */
    
}

export function isCheckmate(color, piecePositions){
    if(kingCanEscape(color, piecePositions)){
        console.log("kingCanEscape sucessfully ran");
        return false;
    }
    if(checkPiece === 'n'){
        for(let square in piecePositions){
            if(color === piecePositions[square][0] && validMove(piecePositions[square][0], piecePositions[square][1], square, checkPieceSquare, piecePositions)){
                return false;
            }
        }
        return true;
    }
    else{
        const changeX = checkKingPosition[0].charCodeAt(0)-checkPieceSquare[0].charCodeAt(0);
        const changeY = Number(checkKingPosition[1]) - Number(checkPieceSquare[1]);

        let tempSquare = checkPieceSquare;

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

        while(tempSquare !== checkKingPosition){
            for(let square in piecePositions){
                if(color === piecePositions[square][0] && validMove(piecePositions[square][0], piecePositions[square][1], square, tempSquare, piecePositions)){
                    return false;
                }
            }
            stepX();
            stepY();
        }
        return true;
    
    }
}

function willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions){
    let newPiecePositions = JSON.parse(JSON.stringify(piecePositions));
    delete newPiecePositions[startSquare];
    newPiecePositions[endSquare] = color + piece;  
    return !inCheck(color, newPiecePositions);
}


//stuff checking overall validity
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
export function validMove(color, piece, startSquare, endSquare, piecePositions){
    return validPieceMove(color, piece, startSquare, endSquare, piecePositions) && willNotBeInCheck(color, piece, startSquare, endSquare, piecePositions);
}