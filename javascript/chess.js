function validMove(color, piece){
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

function isInCheck(color, piecePositions){
    
}


function validSquare(e){
    if(piecePositions[e.target.id]){
        if(piecePositions[e.target.id][0] === 'w' && whiteMove){
            return true;
        }
        else if(piecePositions[e.target.id][0]==='b' && !whiteMove){
            return true;
        }
    }
    return false;
}

function choseSquare(e){
    //if we haven't chosen a starting square then choose it otherwise we choose an ending square and see if the square works
    if(startSquare){
        const color = piecePositions[startSquare][0];
        const piece = piecePositions[startSquare][1];
        endSquare = e.target.id;
        console.log(endSquare);
        console.log(color, piece);
        if(validMove(color, piece)){
            console.log("guh");
            whiteMove = !whiteMove;
        }
        startSquare = null;
        endSquare = null;
        return;
    }
    else if(!validSquare(e)){
        return;
    }
    startSquare = e.target.id;
    console.log(startSquare);
}

//setting up click feature
let chessSquares = document.getElementsByTagName("div");
for(let i = 1; i <= 64; i++){
    chessSquares[i].addEventListener("click", choseSquare)
}

let whiteMove = true;
let startSquare = null;
let endSquare = null;

let piecePositions = {
    a1: "wr",
    b1: "wn",
    c1: "wb",
    d1: "wq",
    e1: "wk",
    f1: "wb",
    g1: "wn",
    h1: "wr",
    a2: "wp",
    b2: "wp",
    c2: "wp",
    d2: "wp",
    e2: "wp",
    f2: "wp",
    g2: "wp",
    h2: "wp",
    
    a8: "br",
    b8: "bn",
    c8: "bb",
    d8: "bq",
    e8: "bk",
    f8: "bb",
    g8: "bn",
    h8: "br",
    a7: "bp",
    b7: "bp",
    c7: "bp",
    d7: "bp",
    e7: "bp",
    f7: "bp",
    g7: "bp",
    h7: "bp",
}

