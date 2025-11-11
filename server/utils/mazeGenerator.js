// --- Funciones auxiliares (Sin cambios) ---
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

function addLoopsToMakeEasier(maze, size, probability) {
  for (let i = 1; i < size - 1; i++) {
    for (let j = 1; j < size - 1; j++) {
      if (maze[i][j] === '_') {
        const isHorizontalTunnel = isInBounds(i, j - 1, size) && maze[i][j - 1] === ' ' && isInBounds(i, j + 1, size) && maze[i][j + 1] === ' ';
        const isVerticalTunnel = isInBounds(i - 1, j, size) && maze[i - 1][j] === ' ' && isInBounds(i + 1, j, size) && maze[i + 1][j] === ' ';
        if ((isHorizontalTunnel || isVerticalTunnel) && Math.random() < probability) {
          maze[i][j] = ' ';
        }
      }
    }
  }
}

// --- 💎 OPTIMIZACIÓN: Generador Iterativo ---
/**
 * Esta función reemplaza 'carvePassagesFrom' recursivo.
 * Usa una pila explícita para evitar el Stack Overflow.
 */
function carvePassagesIterative(maze, size) {
  const stack = [];
  const startX = 1, startY = 1;

  maze[startX][startY] = ' '; // Marcar celda inicial como visitada
  stack.push([startX, startY]);

  const directions = [
    [-2, 0], // Arriba
    [2, 0],  // Abajo
    [0, 2],  // Derecha
    [0, -2]  // Izquierda
  ];

  while (stack.length > 0) {
    // 1. Mirar la celda actual (sin sacarla de la pila)
    const [cx, cy] = stack[stack.length - 1];
    const validNeighbors = [];

    // 2. Buscar vecinos no visitados
    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      // Comprobar si está dentro de los límites Y si es una pared no visitada ('_')
      if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && maze[nx][ny] === '_') {
        validNeighbors.push([nx, ny, dx, dy]); // Guardar vecino y dirección
      }
    }

    if (validNeighbors.length > 0) {
      // 3. SI hay vecinos:
      // Elegir uno al azar
      const [nx, ny, dx, dy] = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];

      // Tallar la pared intermedia
      maze[cx + dx / 2][cy + dy / 2] = ' ';
      // Marcar el vecino como visitado
      maze[nx][ny] = ' ';

      // Empujar (push) el vecino a la pila
      stack.push([nx, ny]);
    } else {
      // 4. SI NO hay vecinos (callejón sin salida):
      // Retroceder sacando (pop) la celda de la pila
      stack.pop();
    }
  }
}


// --- Función Principal (Ahora usa la versión iterativa) ---

function generateMaze(difficulty) {
  let size;
  let loopProbability = 0;

  switch (difficulty) {
    case 'easy':
      size = 12;
      loopProbability = 0.15;
      break;
    case 'medium':
      size = 16;
      loopProbability = 0.05;
      break;
    case 'hard':
      size = 20;
      loopProbability = 0;
      break;
    default:
      size = 12;
      loopProbability = 0.15;
  }

  const maze = Array.from({ length: size }, () => Array(size).fill('_'));

  // 1. Tallar el laberinto "perfecto" (difícil) usando el método iterativo
  carvePassagesIterative(maze, size);

  // 2. (Opcional) Hacerlo más fácil añadiendo bucles
  if (loopProbability > 0) {
    addLoopsToMakeEasier(maze, size, loopProbability);
  }
  
  // 3. Colocar P y F (Optimización Menor)
  // En lugar de 'guess-and-check', creamos una lista de celdas válidas.
  const availableSpaces = [];
  for (let i = 1; i < size - 1; i++) {
    for (let j = 1; j < size - 1; j++) {
      if (maze[i][j] === ' ') {
        availableSpaces.push([i, j]);
      }
    }
  }
  
  // Barajamos la lista de espacios
  shuffle(availableSpaces);

  // Colocar Jugador
  const [px, py] = availableSpaces.pop();
  maze[px][py] = 'P';

  // Colocar Meta (buscando una que cumpla la distancia)
  let finishPosition = null;
  while(availableSpaces.length > 0 && finishPosition === null) {
      const [fx, fy] = availableSpaces.pop();
      if (distance(px, py, fx, fy) >= size * 0.75) {
          finishPosition = [fx, fy];
          maze[fx][fy] = 'F';
      }
  }
  
  // Fallback por si no encontramos ninguno con la distancia (muy improbable)
  if (finishPosition === null) {
      const [fx, fy] = availableSpaces[0] || [size - 2, size - 2]; // Último recurso
      maze[fx][fy] = 'F';
  }

  return maze;
}

module.exports = generateMaze;