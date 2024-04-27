document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('grid-container');
  const scoreElement = document.getElementById('score-value');
  const restartBtn = document.getElementById('restartBtn');

  let grid = [];
  let score = 0;

  // Initialize grid and add starting tiles
  function init() {
    grid = [];
    score = 0;
    for (let i = 0; i < 4; i++) {
      grid[i] = [];
      for (let j = 0; j < 4; j++) {
        grid[i][j] = 0;
      }
    }
    addRandomTile();
    addRandomTile();
    renderGrid();
    updateScore();
  }

  // Render the grid
  function renderGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = grid[i][j] !== 0 ? grid[i][j] : '';
        cell.style.backgroundColor = getTileColor(grid[i][j]);
        gridContainer.appendChild(cell);
      }
    }
  }

  // Get color for tile based on value
  function getTileColor(value) {
    switch (value) {
      case 2: return '#00BFFF';
      case 4: return '#00D4F7';
      case 8: return '#00E5DC';
      case 16: return '#46A6F8';
      case 32: return '#728AE6';
      case 64: return '#008AC6';
      case 128: return '#0083E1';
      case 256: return '#005289';
      case 512: return '#3B8E83';
      case 1024: return '#5E97B9';
      case 2048: return '#0098D5';
      default: return '#000;';
    }
  }

  // Add a random tile (2 or 4) to a random empty position
  function addRandomTile() {
    const availableCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          availableCells.push({ x: i, y: j });
        }
      }
    }
    if (availableCells.length > 0) {
      const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
      grid[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  // Update the score display
  function updateScore() {
    scoreElement.textContent = score;
  }

  // Handle key press events
  document.addEventListener('keydown', e => {
    if (!isGameOver()) {
      let moved = false;
      switch (e.key) {
        case 'ArrowUp':
          moved = moveUp();
          break;
        case 'ArrowDown':
          moved = moveDown();
          break;
        case 'ArrowLeft':
          moved = moveLeft();
          break;
        case 'ArrowRight':
          moved = moveRight();
          break;
      }
      if (moved) {
        addRandomTile();
        renderGrid();
        updateScore();
        if (isGameOver()) {
          alert('Game Over! Your final score is ' + score);
        }
      }
    }
  });

  // Check if the game is over (no available moves)
  function isGameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          return false;
        }
        if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
          return false;
        }
        if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
          return false;
        }
      }
    }
    return true;
  }

  // Move tiles up
  function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      for (let i = 1; i < 4; i++) {
        if (grid[i][j] !== 0) {
          let k = i;
          while (k > 0 && grid[k - 1][j] === 0) {
            grid[k - 1][j] = grid[k][j];
            grid[k][j] = 0;
            k--;
            moved = true;
          }
          if (k > 0 && grid[k - 1][j] === grid[k][j]) {
            grid[k - 1][j] *= 2;
            score += grid[k - 1][j];
            grid[k][j] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Move tiles down
  function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      for (let i = 2; i >= 0; i--) {
        if (grid[i][j] !== 0) {
          let k = i;
          while (k < 3 && grid[k + 1][j] === 0) {
            grid[k + 1][j] = grid[k][j];
            grid[k][j] = 0;
            k++;
            moved = true;
          }
          if (k < 3 && grid[k + 1][j] === grid[k][j]) {
            grid[k + 1][j] *= 2;
            score += grid[k + 1][j];
            grid[k][j] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Move tiles left
  function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k > 0 && grid[i][k - 1] === 0) {
            grid[i][k - 1] = grid[i][k];
            grid[i][k] = 0;
            k--;
            moved = true;
          }
          if (k > 0 && grid[i][k - 1] === grid[i][k]) {
            grid[i][k - 1] *= 2;
            score += grid[i][k - 1];
            grid[i][k] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Move tiles right
  function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k < 3 && grid[i][k + 1] === 0) {
            grid[i][k + 1] = grid[i][k];
            grid[i][k] = 0;
            k++;
            moved = true;
          }
          if (k < 3 && grid[i][k + 1] === grid[i][k]) {
            grid[i][k + 1] *= 2;
            score += grid[i][k + 1];
            grid[i][k] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Initialize game
  init();

  // Restart game
  restartBtn.addEventListener('click', init);
});
