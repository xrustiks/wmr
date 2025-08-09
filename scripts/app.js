import { placeCards } from './helpers.js';

export const mainHeader = document.querySelector(".main-header");

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