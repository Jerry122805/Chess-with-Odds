function displayMinuteSeconds(timeInMilliseconds){
    const timeInSeconds = Math.floor(timeInMilliseconds/1000);
    return `${Math.floor(timeInSeconds/60)}:${((timeInSeconds/100).toFixed(2)).slice(2,4)}`;

}


function setTimer(timeInMilliseconds){
    document.querySelector(".timer-white").innerHTML = displayMinuteSeconds(timeInMilliseconds);
    document.querySelector(".timer-black").innerHTML = displayMinuteSeconds(timeInMilliseconds);
}


let timerWhite;
let timerBlack;
let stopTimerWhite;
let stopTimerBlack;

setTimer(6000);


export function startTimer(whiteMove){
    whiteMove ? runTimerWhite() : runTimerBlack();
    
}

function runTimerWhite(){
    stopTimerWhite = setInterval(() => {
        timerWhite -= 10;
        document.querySelector(".timer-white").innerHTML = displayMinuteSeconds(timerWhite);
    }, 10)
    clearInterval(stopTimerBlack);
}


function runTimerBlack(){
    stopTimerBlack = setInterval(() => {
        timerBlack -= 10;
        document.querySelector(".timer-black").innerHTML = displayMinuteSeconds(timerBlack);
    }, 10)
    clearInterval(stopTimerWhite);
}

