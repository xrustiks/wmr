const mainHeader = document.getElementById("main-header");
const cards = document.querySelectorAll(".card");

const minWidth = 190;
const maxWidth = 400;
const padding = 10;

// Array to keep track of occupied positions
let occupedPositions = [];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}