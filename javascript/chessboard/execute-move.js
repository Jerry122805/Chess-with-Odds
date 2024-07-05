import {isCastling,noLongerCastling} from "./check-move-validity.js";

export function highlightSquare(startSquare, color){
    const htmlSquare = document.getElementById(startSquare);
    htmlSquare.style.backgroundColor = color;
}

export function removeHighlight(square){
    const htmlSquare = document.getElementById(square);
    htmlSquare.style.backgroundColor = "";
}



function movePiece(color, piece, startSquare, endSquare, piecePositions){
    const htmlStartSquare = document.getElementById(startSquare);
    const htmlEndSquare = document.getElementById(endSquare);

    const piecePicture = htmlStartSquare.innerHTML;
    htmlStartSquare.innerHTML = "";
    htmlEndSquare.innerHTML = piecePicture;

    delete piecePositions[startSquare];
    piecePositions[endSquare] = color + piece;
    highlightSquare(endSquare, "#ffff99");
}

function castle(color, piece, startSquare, endSquare, piecePositions){
    if(endSquare === 'g1'){
        movePiece('w', 'k', 'e1', 'g1', piecePositions);
        movePiece('w', 'r', 'h1', 'f1', piecePositions);
        removeHighlight('f1');
    }
    else if(endSquare === 'c1'){
        movePiece('w', 'k', 'e1', 'c1', piecePositions);
        movePiece('w', 'r', 'a1', 'd1', piecePositions);
        removeHighlight('d1');
    }

    if(endSquare === 'g8'){
        movePiece('b', 'k', 'e8', 'g8', piecePositions);
        movePiece('b', 'r', 'h8', 'f8', piecePositions);
        removeHighlight('f8');
    }

    else if(endSquare === 'c8'){
        movePiece('b', 'k', 'e8', 'a8', piecePositions);
        movePiece('b', 'r', 'a8', 'd8', piecePositions);
        removeHighlight('d8');
    }
}

export function move(color, piece, startSquare, endSquare, piecePositions){
    if(isCastling){
        castle(color, piece, startSquare, endSquare, piecePositions);
        noLongerCastling();
    }
    else{movePiece(color, piece, startSquare, endSquare, piecePositions);}
}

