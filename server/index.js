const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas del laberinto
const mazeRoutes = require('./routes/maze');
app.use('/api/maze', mazeRoutes);

// Ruta por defecto
app.use("/", (req, res) => {
  res.send("Server is running.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
