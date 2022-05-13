"use strict";

let deckID = getDeckID();

let btnDrawDealer = document.querySelector(".btnDrawD");
let btnDrawPlayer = document.querySelector(".btnDrawP");
let btnStop = document.querySelector(".btnStop");

let player = document.querySelector(".cards-player1");
let dealer = document.querySelector(".cards-dealer");

function getDeckID() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
    .then((res) => res.json())
    .then((data) => {
      deckID = data.deck_id;
      return deckID;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function drawACard(who) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => res.json())
    .then((data) => {
      let img = createNode("img");
      let cardValue = getCardValue(data.cards[0].value, who);
      img.src = data.cards[0].image;
      img.style.height = "150px";
      img.style.width = "auto";

      if (who == "dealer") {
        append(dealer, img);
        Dealer.score += cardValue;
        return Dealer.score;
      } else if (who == "player") {
        append(player, img);
        Player.score += cardValue;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

btnDrawPlayer.addEventListener("click", () => drawACard("player"));

//Helper Functions

function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}

//Game Logic

function MakePlayerDealer(id) {
  (this.score = 0),
    (this.id = id),
    (this.draw = function () {
      drawACard(this.id);
    });

  this.calcScore = function () {
    alert(this.score);
  };
}

let Player = new MakePlayerDealer("player");
let Dealer = new MakePlayerDealer("dealer");

function getCardValue(value, who) {
  if (value == "JACK") {
    return 10;
  } else if (value == "QUEEN") {
    return 10;
  } else if (value == "KING") {
    return 10;
  } else if (value == "ACE") {
    //The Value of Ace (1 or 11) will be calculated when the player stops drawing cards
    return 0;
  } else {
    return Number(value);
  }
}

let startBtn = document.querySelector(".start-game");
let gameInterface = document.querySelector(".game-interface");
startBtn.addEventListener("click", startGame);

function startGame() {
  gameInterface.style.display = "block";
  startBtn.style.display = "none";
  Dealer.draw();
  Player.draw();
}

btnStop.addEventListener("click", () => {
  dealerKI();
});

//Needs an async fix
async function dealerKI() {
  for (let i = Dealer.score; i <= 16; i = i + Dealer.score) {
    console.log("counter", i);
    console.log("DealerScore", Dealer.score);
    await Dealer.draw();
  }
}
