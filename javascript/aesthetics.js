export function highlightSquare(startSquare){
    const htmlSquare = document.getElementById(startSquare);
    htmlSquare.style.backgroundColor = "#ffff99";
}

export function removeHighlight(square){
    const htmlSquare = document.getElementById(square);
    htmlSquare.style.backgroundColor = "";
}