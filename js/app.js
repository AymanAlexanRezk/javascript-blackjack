const player = {
  name: 'Ayman',
  chips: 150,
};

//* Global Variables:
let totalCash = player.chips;
let cards = [];
let sum = 0;
let starts = 0;
let blackJacks = 0;
let accuracy = 0;
let isAlive = false;
let message = '';
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let cardsEl = document.getElementById('cards-el');
let playerEl = document.getElementById('player-el');
let countBlackJack = document.getElementById('countBlackJack');
let countStart = document.getElementById('countStart');
let accuracyEl = document.getElementById('accuracy-el');

//* Set a starting cash to $150
playerEl.textContent = player.name + ': ' + totalCash + '$';

function getRandomCard() {
  let randNum = Math.floor(Math.random() * 13) + 1;
  if (randNum > 10) {
    return 10;
  } else if (randNum === 1) {
    return 11;
  } else {
    return randNum;
  }
}

function startGame() {
  if (!isAlive && totalCash) {
    isAlive = true; //* To prevent starting a started game.
    starts++;
    totalCash -= 10; //* Discounted every new round.
    renderCalc();
    countStart.textContent = 'Starts: ' + starts;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
  }
}

//* Track the game status:
function renderGame() {
  cardsEl.textContent = 'Cards: ';
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]} `;
  }

  sumEl.textContent = `Sum: ${sum}`;
  if (sum <= 20) {
    message = 'Draw a new card?';
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    isAlive = false;
    blackJacks++;
    totalCash += 50;
    renderBlackJacks();
    renderCalc();
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

//* To calculate luck percentage:
function renderCalc() {
  playerEl.textContent = player.name + ': ' + totalCash + '$';
  accuracyEl.textContent =
    'Accuracy: ' + Math.floor((blackJacks / starts) * 100) + '%';
}

//* Track BlackJacks:
function renderBlackJacks() {
  countBlackJack.textContent = 'BlackJacks: ' + blackJacks;
}

//* Reset to start a new game from the very 1st beginning:
function reset() {
  sum = 0;
  starts = 0;
  blackJacks = 0;
  accuracy = 0;

  cardsEl.textContent = 'Cards: ';
  messageEl.textContent = 'Want to play a round?';
  sumEl.textContent = 'Sum: ';
  countBlackJack.textContent = 'BlackJacks: ';
  countStart.textContent = 'Starts: ';
  accuracyEl.textContent = 'Accuracy: ';
  playerEl.textContent = player.name + ': ' + totalCash + '$';
}

function newGame() {
  if (totalCash === 0) {
    blackJacks > 2 ? blackJacks-- : blackJacks;
    totalCash += 150;
    reset();
  }
}
