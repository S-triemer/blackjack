"use strict";

let deckID = getDeckID();

let btnDrawDealer = document.querySelector(".btnDrawD");
let btnDrawPlayer = document.querySelector(".btnDrawP");

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

function drawACard(who) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(Player.score);
      let img = createNode("img");
      let cardValue = getCardValue(data.cards[0].value, who);
      img.src = data.cards[0].image;
      img.style.height = "150px";
      img.style.width = "auto";

      if (who == "dealer") {
        append(dealer, img);
        Dealer.score += cardValue;
      } else if (who == "player") {
        append(player, img);
        Player.score += cardValue;
      }
      if (Player.score > 21) {
        console.log("Player loses");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

btnDrawDealer.addEventListener("click", () => drawACard("dealer"));
btnDrawPlayer.addEventListener("click", () => drawACard("player"));

//Helper Functions

function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}

//Game Logic

let Player = {
  score: 0,
  draw: function () {
    drawACard("player");
  },
};
let Dealer = {
  score: 0,
  draw: function () {
    drawACard("dealer");
  },
};

function getCardValue(value, who) {
  if (value == "JACK") {
    return 10;
  } else if (value == "QUEEN") {
    return 10;
  } else if (value == "KING") {
    return 10;
  } else if (value == "ACE") {
    //Basic first Idea for handling of aces but what if you overdraw later? can a 11 become a 1?
    if (checkScore(who) > 10) {
      console.log(checkScore(who));
      return 1;
    } else {
      console.log(checkScore(who));
      return 11;
    }
  } else {
    return Number(value);
  }
}

function checkScore(who) {
  if (who === "player") {
    return Player.score;
  } else {
    return Dealer.score;
  }
}
