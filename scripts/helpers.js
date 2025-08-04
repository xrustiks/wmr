import { minWidth, maxWidth, padding, occupiedPositions } from './app.js';

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
      y < pos.y + pos.height - padding &&
      y + height > pos.y + padding
    );
  })
}

// Generates a random position and size for a card
const getRandomPositionAndSize = (maxX, maxY, card) => {
  let x, y;
  // Amount of attempts to place a card
  let attempts = 0;
  // How many attempts before giving up
  let maxAttempts = 100;

  // Calculate the maximum width and height based on the screen size
  const width = getRandomInt(minWidth, maxWidth);
  const height = Math.floor(width * 2 / 3);

  do {
    // Generating random coordinates
    x = Math.floor(Math.random() * (maxX - width));
    y = Math.floor(Math.random() * (maxY - height));

    attempts++;

    if (attempts > maxAttempts) {
      console.warn("На экране больше не хватает места, чтобы разместить новую карточку " & card.textContent);
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
}

export { getRandomInt, isOverlapping, getRandomPositionAndSize };