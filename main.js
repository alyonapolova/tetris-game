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
  console.log(playfield);
}

function generateTetromino() {
  const nameTetro = "o";
  const matrixTetro = TETROMINOES[nameTetro];

  const columnTetro = 5;
  const rowTetro = 3;

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
console.log(cells);

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
