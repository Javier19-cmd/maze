function generateMaze(difficulty) {
  let size;
  switch (difficulty) {
    case 'easy':
      size = 10; // Tamaño más grande para fácil
      break;
    case 'medium':
      size = 15; // Tamaño más grande para medio
      break;
    case 'hard':
      size = 18; // Tamaño más grande para difícil
      break;
    default:
      size = 10;
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

  // Aumentar la complejidad del laberinto añadiendo más caminos y bifurcaciones
  function addComplexity(maze) {
    for (let i = 1; i < size - 1; i++) {
      for (let j = 1; j < size - 1; j++) {
        if (maze[i][j] === '_' && Math.random() > 20) { // Reducido para agregar más caminos
          maze[i][j] = ' ';
          createDeadEnds(i, j, maze);
        }
      }
    }
  }

  // Crear caminos sin salida y bifurcaciones para aumentar la complejidad
  function createDeadEnds(x, y, maze) {
    const directions = [
      [1, 0], // Down
      [-1, 0], // Up
      [0, 1], // Right
      [0, -1] // Left
    ];

    shuffle(directions);

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (isInBounds(nx, ny, size) && maze[nx][ny] === '_') {
        if (Math.random() > 0.2) { // Reducido para crear más bifurcaciones y caminos sin salida
          maze[nx][ny] = ' ';
          createDeadEnds(nx, ny, maze);
        }
      }
    });
  }

  addComplexity(maze);

  // Función para asegurar que hay un camino libre alrededor de la posición
  function hasFreeAdjacentCell(x, y) {
    const directions = [
      [1, 0], // Down
      [-1, 0], // Up
      [0, 1], // Right
      [0, -1] // Left
    ];

    return directions.some(([dx, dy]) => isInBounds(x + dx, y + dy, size) && maze[x + dx][y + dy] === ' ');
  }

  // Colocar el personaje 'P' y el final 'F'
  let playerPosition, finishPosition;
  do {
    playerPosition = {
      x: Math.floor(Math.random() * (size - 2)) + 1,
      y: Math.floor(Math.random() * (size - 2)) + 1,
    };
  } while (maze[playerPosition.x][playerPosition.y] !== ' ' || !hasFreeAdjacentCell(playerPosition.x, playerPosition.y));

  maze[playerPosition.x][playerPosition.y] = 'P';

  do {
    finishPosition = {
      x: Math.floor(Math.random() * (size - 2)) + 1,
      y: Math.floor(Math.random() * (size - 2)) + 1,
    };
  } while (
    maze[finishPosition.x][finishPosition.y] !== ' ' ||
    !hasFreeAdjacentCell(finishPosition.x, finishPosition.y) || // Asegurar que la meta no esté encerrada
    distance(playerPosition.x, playerPosition.y, finishPosition.x, finishPosition.y) < size * 0.75 // Mayor distancia mínima
  );

  maze[finishPosition.x][finishPosition.y] = 'F';

  return maze;
}

module.exports = generateMaze;
