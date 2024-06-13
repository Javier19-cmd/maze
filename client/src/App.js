import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleSelectDifficulty = (difficulty) => {
    navigate(`/maze/${difficulty}`);
  };

  return (
    <Container className="App" maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          Selecciona la dificultad del laberinto
        </Typography>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => handleSelectDifficulty('easy')}>
            Fácil
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleSelectDifficulty('medium')}>
            Medio
          </Button>
          <Button variant="contained" color="error" onClick={() => handleSelectDifficulty('hard')}>
            Difícil
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
