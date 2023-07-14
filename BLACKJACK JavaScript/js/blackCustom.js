// BlackJack Code
let firstCard = 10;
let secondCard = 7;
let allCards = [firstCard, secondCard];
let sum = firstCard + secondCard;
let hasBlackJack = false;
let isAlive = true;
let messageLine = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
// let sumEl = document.querySelector("#sum-el");
let cardEl = document.getElementById("card-el");
function startGame(){
    renderGame();
}
function renderGame(){
    cardEl.textContent = "Cards: " + allCards[0] + " " + allCards[1];
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        messageLine = "Do you want to draw another Card?";
    } else if (sum === 21) {
        messageLine = "You've got a Blackjack!";
        hasBlackJack = true;
    } else {    
        messageLine = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = messageLine;
    
}
function newCard(){
    console.log("Drawing a new card from the deck!");
    let newCard = 4;
    sum += newCard;
    allCards.push(newCard);
    console.log(allCards);
    renderGame();
}