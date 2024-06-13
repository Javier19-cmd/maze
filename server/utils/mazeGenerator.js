function generateMaze(difficulty) {
  let size;
  switch (difficulty) {
    case 'easy':
      size = 15; // Tamaño más grande para fácil
      break;
    case 'medium':
      size = 20; // Tamaño más grande para medio
      break;
    case 'hard':
      size = 30; // Tamaño más grande para difícil
      break;
    default:
      size = 15;
  }

  const maze = Array.from({ length: size }, () => Array(size).fill('_'));

  function carvePassagesFrom(cx, cy, maze) {
    const directions = [
      [1, 0], // Down
      [-1, 0], // Up
      [0, 1], // Right
      [0, -1] // Left
    ];

    shuffle(directions);

    directions.forEach(([dx, dy]) => {
      const nx = cx + dx * 2;
      const ny = cy + dy * 2;

      if (isInBounds(nx, ny, size) && maze[nx][ny] === '_') {
        maze[cx + dx][cy + dy] = ' ';
        maze[nx][ny] = ' ';
        carvePassagesFrom(nx, ny, maze);
      }
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function isInBounds(x, y, size) {
    return x > 0 && x < size - 1 && y > 0 && y < size - 1;
  }

  function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  maze[1][1] = ' ';
  carvePassagesFrom(1, 1, maze);

  // Aumentar la complejidad del laberinto añadiendo más caminos
  function addComplexity(maze) {
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        if (maze[i][j] === '_' && Math.random() > 0.7) {
          maze[i][j] = ' ';
        }
      }
    }
  }

  addComplexity(maze);

  // Colocar el personaje 'P' y el final 'F'
  let playerPosition, finishPosition;
  do {
    playerPosition = {
      x: Math.floor(Math.random() * (size - 2)) + 1,
      y: Math.floor(Math.random() * (size - 2)) + 1,
    };
  } while (maze[playerPosition.x][playerPosition.y] !== ' ');

  maze[playerPosition.x][playerPosition.y] = 'P';

  do {
    finishPosition = {
      x: Math.floor(Math.random() * (size - 2)) + 1,
      y: Math.floor(Math.random() * (size - 2)) + 1,
    };
  } while (
    maze[finishPosition.x][finishPosition.y] !== ' ' ||
    (finishPosition.x === playerPosition.x && finishPosition.y === playerPosition.y) ||
    distance(playerPosition.x, playerPosition.y, finishPosition.x, finishPosition.y) < size * 0.75 // Mayor distancia mínima
  );

  maze[finishPosition.x][finishPosition.y] = 'F';

  return maze;
}

module.exports = generateMaze;