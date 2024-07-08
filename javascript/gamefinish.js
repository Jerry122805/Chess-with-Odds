export function gameFinish(loser, methodOfLoss){
    console.log(`${loser} has ${methodOfLoss}. ${loser === 'White' ? 'Black' : 'White'} wins the game!`);
}