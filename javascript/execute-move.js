import {highlightSquare, removeHighlight} from "./aesthetics.js"


export function movePiece(startSquare, endSquare){
    const htmlStartSquare = document.getElementById(startSquare);
    const htmlEndSquare = document.getElementById(endSquare);

    const piecePicture = htmlStartSquare.innerHTML;
    htmlStartSquare.innerHTML = "";
    htmlEndSquare.innerHTML = piecePicture;


}