let playerText = document.querySelector(".playerText");
const restartBtn = document.querySelector(".restart__btn");
const boxes = document.querySelectorAll(".box");
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
let resetWinnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--reset-winner"
);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

const boxClicked = (e) => {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winningBlocks = playerHasWon();
      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
};

const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playerHasWon = () => {
  for (let condition of winning) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }

  return false;
};

restartBtn.addEventListener("click", () => {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = resetWinnerIndicator;
  });
  playerText.innerHTML = `Tic Tac Toe`;
  currentPlayer = X_TEXT;
});

startGame();
