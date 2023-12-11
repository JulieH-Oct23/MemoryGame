const gameContainer = document.getElementById("game");
let square1 = null;
let square2 = null;
let squaresFlipped = 0;
let noClicking = false;

const COLORS = [
  "aqua",
  "teal",
  "cornflowerblue",
  "gray",
  "darkmagenta",
  "orchid",
  "aqua",
  "teal",
  "cornflowerblue",
  "gray",
  "darkmagenta",
  "orchid"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleSquareClick);
    gameContainer.append(newDiv);
  }
}

function handleSquareClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentSquare = e.target;
  currentSquare.style.backgroundColor = currentSquare.classList[0];

  if (!square1 || !square2) {
    currentSquare.classList.add("flipped");
    square1 = square1 || currentSquare;
    square2 = currentSquare === square1 ? null : currentSquare;
  }

  if (square1 && square2) {
    noClicking = true;
    // debugger
    let gif1 = square1.className;
    let gif2 = square2.className;

    if (gif1 === gif2) {
      squaresFlipped += 2;
      square1.removeEventListener("click", handleSquareClick);
      square2.removeEventListener("click", handleSquareClick);
      square1 = null;
      square2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        square1.style.backgroundColor = "";
        square2.style.backgroundColor = "";
        square1.classList.remove("flipped");
        square2.classList.remove("flipped");
        square1 = null;
        square2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (squaresFlipped === COLORS.length) alert("You've Mastered Julie's Memory Game, Game Over!");
}

createDivsForColors(shuffledColors);
