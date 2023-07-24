// BlackJack Code
let allCards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let messageLine = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
// let sumEl = document.querySelector("#sum-el");
let cardEl = document.getElementById("card-el");

let player = {
    name: "Noman",
    chips: 145
}


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard(){
    let randomNumber = Math.floor( Math.random() * 13 ) + 1;
    if ( randomNumber === 1 ){
        return 11;
    } else if ( randomNumber > 10 ){
        return 10;
    } else {
        return randomNumber;
    }
}

function startGame(){
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    allCards= [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame(){
    cardEl.textContent = "Cards: "
    for (let i = 0; i < allCards.length; i += 1)
    {
        cardEl.textContent += allCards[i] + " ";
    }
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
    if (isAlive === true && hasBlackJack === false){
        let newCard = getRandomCard();
        sum += newCard;
        allCards.push(newCard);
        console.log(allCards);
        renderGame();
    }
}