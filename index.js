let deckId

const newDeckBtn = document.getElementById("new-deck")

const drawCardBtn = document.getElementById("draw-cards")

const cardsContainer = document.getElementById("cards-container")

const winnerText = document.getElementById("winner-text")
const remainingText = document.getElementById("remaining-cards")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            
            deckId = data.deck_id
            remainingText.textContent = `Remaining cards: ${data.remaining}`
        })
}


newDeckBtn.addEventListener("click", handleClick)
/**
 * Challenge
 * 
 * Task: Using the saved deckId, draw 2 new cards from the deck
 * 
 * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 */
function handleWin(card1, card2){
    if(card1.value > card2.value){
        return "Computer wins"
    } else if(card1.value < card2.value){
        return "Player wins"
    } else {
        return "It's a tie"
    }
}


drawCardBtn.addEventListener('click', () => {
    
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        remainingText.textContent = `Remaining cards: ${data.remaining} cards left`
        cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
        `
        cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />`
        winnerText.textContent = handleWin(data.cards[0], data.cards[1])
        if(data.remaining === 0){
            handleNoCardsLeft()
        }
  
    })
});

function handleNoCardsLeft(){
    drawCardBtn.setAttribute("disabled", true);
    drawCardBtn.setAttribute("style", "background-color: grey");
    drawCardBtn.setAttribute("style" , "cursor: not-allowed");
    remainingText.textContent = "No cards left in the deck";
    
}



// function determineCardWinner(card1, card2) {
//     const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
//     "10", "JACK", "QUEEN", "KING", "ACE"]
//     const card1ValueIndex = valueOptions.indexOf(card1.value)
//     const card2ValueIndex = valueOptions.indexOf(card2.value)
//     console.log("card 1:", card1ValueIndex)
//     console.log("card 2:", card2ValueIndex)
    
//     if (card1ValueIndex > card2ValueIndex) {
//         console.log("Card 1 wins!")
//     } else if (card1ValueIndex < card2ValueIndex) {
//         console.log("Card 2 wins!")
//     } else {
//         console.log("It's a tie!")
//     }
// }

