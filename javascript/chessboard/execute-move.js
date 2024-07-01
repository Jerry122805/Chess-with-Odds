export function highlightSquare(startSquare){
    const htmlSquare = document.getElementById(startSquare);
    htmlSquare.style.backgroundColor = "#ffff99";
}

export function removeHighlight(square){
    const htmlSquare = document.getElementById(square);
    htmlSquare.style.backgroundColor = "";
}

export function movePiece(color, piece, startSquare, endSquare, piecePositions){
    const htmlStartSquare = document.getElementById(startSquare);
    const htmlEndSquare = document.getElementById(endSquare);

    const piecePicture = htmlStartSquare.innerHTML;
    htmlStartSquare.innerHTML = "";
    htmlEndSquare.innerHTML = piecePicture;

    delete piecePositions[startSquare];
    piecePositions[endSquare] = color + piece;
    highlightSquare(endSquare);
}

