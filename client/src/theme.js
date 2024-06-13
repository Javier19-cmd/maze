import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Esto habilita el modo oscuro
    primary: {
      main: '#388e3c', // Verde elegante
    },
    secondary: {
      main: '#0288d1', // Azul elegante
    },
    error: {
      main: '#d32f2f', // Rojo elegante
    },
    background: {
      default: '#121212', // Fondo muy oscuro
      paper: '#1e1e1e', // Fondo de elementos
    },
    text: {
      primary: '#ffffff', // Texto blanco
      secondary: '#b0bec5', // Texto gris claro
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#ffffff',
    },
    body1: {
      color: '#ffffff',
    },
  },
});

export default theme;
