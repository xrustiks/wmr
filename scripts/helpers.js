// Randomizer - auxiliary function for generating random integers
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Checks if the new position overlaps with any existing card positions
// width, height - dimensions of the card
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
  let maxAttempts = 100;

  // Calculate the maximum width and height based on the screen size
  const width = getRandomInt(minWidth, maxWidth);
  const height = Math.floor(width * 2 / 3);

  do {
    x = Math.floor(Math.random() * (maxX - width));
    y = Math.floor(Math.random() * (maxY - height));

    attempts++;

    if (attempts > maxAttempts) {
      console.warn("Невозможно разместить карточку " & card.textContent + " в пределах экрана");
      return null;

    }
  } while (isOverlapping(x, y, width, height, occupiedPositions));
}

export { getRandomInt, isOverlapping, getRandomPositionAndSize };