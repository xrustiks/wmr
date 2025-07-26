const mainHeader = document.getElementById("main-header");
const cards = document.querySelectorAll(".card");

const minWidth = 190;
const maxWidth = 400;
const padding = 10;

// Array to keep track of occupied positions
let occupiedPositions = [];

// Randomizator - auxiliary function
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Checks if the new position overlaps with any existing card positions
// width, height - dimensions of the card
// x, y - new spot coordinates
// positions - array of occupied positions
const isOverlapping = (x, y, width, height, positions) => {
  return positions.some(pos => {
    return (
      x < pos.x + pos.width + padding && 
      x + width > pos.x - padding &&
      y < pos.y + pos.height - padding &&
      y + height > pos.y + padding
    );
  })
}