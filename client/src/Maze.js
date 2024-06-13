import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Modal, Box, Button } from '@mui/material';
import './Maze.css';

function Maze() {
  const { difficulty } = useParams();
  const navigate = useNavigate(); // Hook de navegación
  const [maze, setMaze] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState(false);

  const fetchMaze = () => {
    fetch(`${process.env.REACT_APP_SERVER}/api/maze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMaze(data.maze);
        setHasWon(false);
        for (let i = 0; i < data.maze.length; i++) {
          for (let j = 0; j < data.maze[i].length; j++) {
            if (data.maze[i][j] === 'P') {
              setPlayerPosition({ x: i, y: j });
              break;
            }
          }
        }
      })
      .catch((error) => console.error('Error fetching maze:', error));
  };

  useEffect(() => {
    fetchMaze();
  }, [difficulty]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!maze || hasWon) return;

      const { x, y } = playerPosition;
      let newX = x;
      let newY = y;

      switch (event.key) {
        case 'ArrowUp':
          newX = x - 1;
          break;
        case 'ArrowDown':
          newX = x + 1;
          break;
        case 'ArrowLeft':
          newY = y - 1;
          break;
        case 'ArrowRight':
          newY = y + 1;
          break;
        default:
          return;
      }

      if (maze[newX][newY] === ' ' || maze[newX][newY] === 'F') {
        const newMaze = maze.map((row, i) => row.map((cell, j) => {
          if (i === x && j === y) return ' ';
          if (i === newX && j === newY) return 'P';
          return cell;
        }));
        setMaze(newMaze);
        setPlayerPosition({ x: newX, y: newY });
        
        if (maze[newX][newY] === 'F') {
          setHasWon(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maze, playerPosition, hasWon]);

  const renderCell = (cell) => {
    switch (cell) {
      case '_':
      case '|':
        return <img src="/images/pared.jpg" alt="pared" className="maze-img" />;
      case 'P':
        return <img src="/images/personaje.jpg" alt="personaje" className="maze-img" />;
      case 'F':
        return <img src="/images/meta.jpg" alt="meta" className="maze-img" />;
      default:
        return <div className="maze-img"></div>;
    }
  };

  return (
    <Container className="Maze">
      <Typography variant="h4" gutterBottom>
        Laberinto ({difficulty})
      </Typography>
      {maze ? (
        <>
          <div className="maze-grid" style={{ gridTemplateColumns: `repeat(${maze[0].length}, 1fr)` }}>
            {maze.map((row, rowIndex) => (
              <div key={rowIndex} className="maze-row">
                {row.map((cell, cellIndex) => (
                  <div key={cellIndex} className="maze-cell">
                    {renderCell(cell)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/')}
            style={{ marginTop: '20px' }}
          >
            Regresar al Menú Principal
          </Button>
          <Modal
            open={hasWon}
            onClose={() => setHasWon(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box className="modal-content">
              <Typography id="modal-title" variant="h6" component="h2">
                ¡Has ganado!
              </Typography>
              <Button onClick={fetchMaze}>Generar nuevo laberinto</Button>
            </Box>
          </Modal>
        </>
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Container>
  );
}

export default Maze;
