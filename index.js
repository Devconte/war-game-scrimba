let deckId
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards-container");
const winnerText = document.getElementById("winner-text");
const remainingText = document.getElementById("remaining-cards");
let playerScore = 0;
let computerScore = 0;

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            remainingText.textContent = `Remaining cards: ${data.remaining}`;
        });
}

newDeckBtn.addEventListener("click", handleClick);

function handleWin(card1, card2){
    if(card1.value > card2.value){
        return "Computer wins";
    } else if(card1.value < card2.value){
        return "Player wins";
    } else {
        return "It's a tie";
    }
}

drawCardBtn.addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        remainingText.textContent = `Remaining cards: ${data.remaining} cards left`;
        cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
        `;
        cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />`;
        winnerText.textContent = handleWin(data.cards[0], data.cards[1]);
        if(data.remaining === 0){
            handleNoCardsLeft();
        }
        handleScore()
    });
});

function handleNoCardsLeft(){
    drawCardBtn.setAttribute("disabled", true);
    drawCardBtn.setAttribute("style", "background-color: grey");
    drawCardBtn.setAttribute("style" , "cursor: not-allowed");
    remainingText.textContent = "No cards left in the deck";
}

function handleScore(){
    if(winnerText.textContent === "Computer wins"){
        computerScore++;
    } else if(winnerText.textContent === "Player wins"){
        playerScore++;
    }
    document.getElementById("player-score").textContent = `Player Score : ${playerScore}`;
    document.getElementById("computer-score").textContent = `Computer Score : ${computerScore}`;
}