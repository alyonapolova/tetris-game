const PLAYFIELD_COLUMS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["o"];

const TETROMINOES = {
  o: [
    [1, 1],
    [1, 1],
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
  const nameTetro = "o";
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

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
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
}
// function moveTetrominoLeft() {
//   if (isOutsideOfGameBoard()) {
//     tetromino.column -= 1;
//   }
// }
// function moveTetrominoRight() {
//   if (isOutsideOfGameBoard()) {
//     tetromino.column += 1;
//   }
// }

function isOutsideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;

  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (
        tetromino.column + column < 1 ||
        tetromino.column + column >= PLAYFIELD_COLUMS - 1
      ) {
        return true;
      }
    }
  }
  return false;
}
