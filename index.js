let deckId
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards-container");
const winnerText = document.getElementById("winner-text");
const remainingText = document.getElementById("remaining-cards");
let playerScore = 0;
let computerScore = 0;

async function handleClick() {
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/");
    const data = await response.json();
    deckId = data.deck_id;
    remainingText.textContent = `Remaining cards: ${data.remaining}`;
    drawCardBtn.removeAttribute("disabled");
}

newDeckBtn.addEventListener("click", handleClick);

function handleWin(card1, card2){
    if(card1.value > card2.value){
        computerScore++;
        document.getElementById("computer-score").textContent = `Computer Score : ${computerScore}`;
        return "Computer wins";
    } else if(card1.value < card2.value){
        playerScore++;
        document.getElementById("player-score").textContent = `Player Score : ${playerScore}`;
        return "Player wins";
        
    } else {
        return "It's a tie";
    }
}

drawCardBtn.addEventListener('click', async () => {
    const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`);
    const data = await response.json();
    if(!deckId){
        drawCardBtn.setAttribute("disabled", true);
        remainingText.textContent = "No deck created. Please create a deck first";
    }

    remainingText.textContent = `Remaining cards: ${data.remaining} cards left`;
    cardsContainer.children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card" />
    `;
    cardsContainer.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card" />`;
    winnerText.textContent = handleWin(data.cards[0], data.cards[1]);
    if(data.remaining === 0){
        handleWinner();
        handleNoCardsLeft();
    }
});

function handleNoCardsLeft(){
    drawCardBtn.setAttribute("disabled", true);
    drawCardBtn.setAttribute("style", "background-color: grey");
    drawCardBtn.setAttribute("style" , "cursor: not-allowed");
    remainingText.textContent = "No cards left in the deck";
}

function handleWinner(){
    if(playerScore > computerScore){
        winnerText.textContent = "Player wins the game";
    } else if(playerScore < computerScore){
        winnerText.textContent = "Computer wins the game";
    } else {
        winnerText.textContent = "It's a tie";
    }
}