let moves = 0;
let winner = null;
let gameState = [];

const checkMatrix = (x, y, z, xoro) => {
  let count = 0;
  if (gameState[x].xoroval == xoro) {
    count++;
  }
  if (gameState[y].xoroval == xoro) {
    count++;
  }
  if (gameState[z].xoroval == xoro) {
    count++;
  }
  if (count == 3) {
    winner = xoro;
    create_new_game_button(`Winner is ${xoro}!`);
  }
};

const checkWin = (xoro) => {
  checkMatrix(0, 1, 2, xoro);
  checkMatrix(3, 4, 5, xoro);
  checkMatrix(6, 7, 8, xoro);
  checkMatrix(0, 3, 6, xoro);
  checkMatrix(1, 4, 7, xoro);
  checkMatrix(2, 5, 8, xoro);
  checkMatrix(0, 4, 8, xoro);
  checkMatrix(2, 4, 6, xoro);
};

const playGame = (e) => {
  let player;
  let xoro;
  id = e.target.id;
  if (moves % 2 == 0) {
    player = "player1";
    xoro = "x";
  } else {
    player = "player2";
    xoro = "o";
  }
  const box = document.getElementById(`${id}`);
  if (gameState[id].xoroval) {
    console.log("choose an empty box");
  } else {
    box.textContent = xoro;
    gameState[id].xoroval = xoro;
    moves++;
    checkWin(xoro);
  }
  if (moves == 9 && winner == null) {
    create_new_game_button("Its a tie!");
  }
};

const gameBoard = () => {
  for (i = 0; i < 9; i++) {
    gameState[i] = { owner: null, xoroval: null };
    const box = document.createElement("div");
    box.id = i;
    box.addEventListener("click", (e) => {
      playGame(e);
    });
    game.appendChild(box);
  }
};

const reset_game = () => {
  gameState = [];
  moves = 0;
  winner = null;
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
  game.setAttribute("style", "pointer-events: auto");
  gameBoard();
};

const create_new_game_button = (comment) => {
  game.setAttribute("style", "pointer-events: none");
  const announce_winner = document.createElement("div");
  announce_winner.textContent = comment;
  result.appendChild(announce_winner);
  button = document.createElement("button");
  button.addEventListener("click", () => {
    reset_game();
  });
  button.textContent = "Start a new game!";
  result.appendChild(button);
};
gameBoard();
