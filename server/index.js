const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 4000;
const API_KEY = process.env.OMDB_API_KEY; 

app.get('/api/search', async (req, res) => {
  const { q, page=1 } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: { s: q, page, apikey: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error querying OMDb' });
  }
});

// Detalle de película
app.get('/api/movie', async (req, res) => {
  const { id } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: { i: id, apikey: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar OMDb' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
