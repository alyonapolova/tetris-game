const PLAYFIELD_COLUMS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O", "L", "J", "S", "Z", "T", "I"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  I: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
};

let playfield;
let tetromino;

function convertPositionIndex(row, column) {
  return row * PLAYFIELD_COLUMS + column;
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMS; i += 1) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }

  playfield = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMS).fill(0));
  //   console.log(playfield);
}

function generateTetromino() {
  const nameTetro = "T";
  const matrixTetro = TETROMINOES[nameTetro];

  const columnTetro = 3;
  const rowTetro = 5;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    column: columnTetro,
    row: rowTetro,
  };
}

generatePlayfield();
generateTetromino();

const cells = document.querySelectorAll(".tetris div");
// console.log(cells);

function drawPlayfield() {
  for (let row = 0; row < PLAYFIELD_ROWS; row += 1) {
    for (let column = 0; column < PLAYFIELD_COLUMS; column += 1) {
      const name = playfield[row][column];
      const cellIndex = convertPositionIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      if (tetromino.matrix[row][column] == 0) {
        continue;
      }
      const cellIndex = convertPositionIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

drawTetromino();

function draw() {
  cells.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
  console.log(e);
  switch (e.key) {
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      console.log(e.key);
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      console.log(e.key);
      moveTetrominoRight();
      break;
  }
  draw();
}

function moveTetrominoDown() {
  tetromino.row += 1;
  if (isOutsideOfGameBoard()) {
    tetromino.row -= 1;
    placeTetromino();
  }
}
function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isOutsideOfGameBoard()) {
    tetromino.column += 1;
  }
}
function moveTetrominoRight() {
  tetromino.column += 1;
  if (isOutsideOfGameBoard()) {
    tetromino.column -= 1;
  }
}

function isOutsideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;

  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      if (
        tetromino.column + column < 0 ||
        tetromino.column + column >= PLAYFIELD_COLUMS ||
        tetromino.row + row >= playfield.length
      ) {
        return true;
      }
    }
  }
  return false;
}

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;

  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;

      playfield[tetromino.row + row][tetromino.column + column] =
        TETROMINO_NAMES[0];
    }
  }
  generateTetromino();
}
