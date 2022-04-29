"use strict";

let deckID = getDeckID();

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

let player1 = document.querySelector(".cards-player1");

function drawACard() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let img = createNode("img");
      img.src = data.cards[0].image;
      append(player1, img);
    })
    .catch((err) => {
      console.log(err);
    });
}

document.querySelector("button").addEventListener("click", drawACard);

function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
