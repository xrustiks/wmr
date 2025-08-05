const mainHeader = document.querySelector(".main-header");
const cards = document.querySelectorAll(".card");

const minWidth = 190;
const maxWidth = 400;
const padding = 10;

// Array to keep track of occupied positions
let occupiedPositions = [];

// Randomizer - auxiliary function for generating random integers
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns true if a new position overlaps with any existing card positions

// width, height - dimensions of cards
// x, y - new spot coordinates
// positions - array of objects with x, y, width, height properties
const isOverlapping = (x, y, width, height, positions) => {
  return positions.some(pos => {
    return (
      x < pos.x + pos.width + padding &&
      x + width > pos.x - padding &&
      y < pos.y + pos.height + padding &&
      y + height > pos.y - padding
    )
  })
}

// Generates a random position and size for a card
const getRandomPositionAndSize = (maxX, maxY, card) => {
  let x, y;
  // Amount of attempts to place a card
  let attempts = 0;
  // How many attempts before giving up
  const maxAttempts = 100;

  // Calculate the maximum width and height based on the screen size
  const width = getRandomInt(minWidth, maxWidth);
  const height = Math.floor(width * 2 / 3);

  do {
    // Generating random coordinates
    x = Math.floor(Math.random() * (maxX - width));
    y = Math.floor(Math.random() * (maxY - height));

    attempts++;

    if (attempts > maxAttempts) {
      console.warn(`На экране больше не хватает места, чтобы разместить новую карточку s${card.textContent}`);
      return null;
    }
  } while (isOverlapping(x, y, width, height, occupiedPositions));

  // Define depth of cards based on their width
  let depth;

  const widthRatio = (width - minWidth) / (maxWidth - minWidth);

  if (widthRatio < 0.33) {
    depth = getRandomInt(1, 2);
  } else if (widthRatio < 0.66) {
    depth = getRandomInt(2, 3);
  } else {
    depth = getRandomInt(3, 4);
  }

  return { x, y, width, height, depth };
}

// Function to place cards on the main header
const placeCards =() => {
  const maxX = mainHeader.clientWidth;
  const maxY = mainHeader.clientHeight;

  occupiedPositions = [];

  cards.forEach(card => {
    const cardInfo = getRandomPositionAndSize(maxX, maxY, card);

    if (cardInfo) {
      const { x, y, width, height, depth } = cardInfo;

      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      card.dataset.depth = depth;

      occupiedPositions.push({ x, y, width, height });
    } else {
      card.style.display = 'none';
    }
  })
}

// Function to place cards based on mouse position relative to the main header
mainHeader.addEventListener('mousemove', (e) => {
  // Returns object with coordinates and dimensions for each card
  const mainHeaderRect = mainHeader.getBoundingClientRect();
  // Finding the center of the main header
  const centerX = mainHeader.clientWidth / 2;
  const centerY = mainHeader.clientHeight / 2;
  // Calculate the mouse position relative to the center of the main header
  const mouseX = (e.clientX - mainHeaderRect.left - centerX) / centerX;
  const mouseY = (e.clientY - mainHeaderRect.top - centerY) / centerY;

  mainHeader.style.setProperty('--mouse-x', mouseX);
  mainHeader.style.setProperty('--mouse-y', mouseY);
  return { mouseX, mouseY };
});

window.addEventListener('load', placeCards);
window.addEventListener('resize', placeCards);