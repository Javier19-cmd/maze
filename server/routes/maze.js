const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const generateMaze = require('../utils/mazeGenerator');

// Configurar el rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 peticiones por ventana
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Endpoint para generar el laberinto
router.post('/', limiter, (req, res) => {
  const { difficulty } = req.body;
  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).json({ error: 'Dificultad no válida. Usa "easy", "medium" o "hard".' });
  }

  const maze = generateMaze(difficulty);
  res.json({ maze });
});

module.exports = router;
