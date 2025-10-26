import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import Pagination from './components/Pagination';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export default function App() {
  const popularQueries = ['Avengers', 'Batman', 'Inception', 'Titanic', 'Star Wars', 'Spiderman'];

  const [query, setQuery] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  // Buscar películas
  useEffect(() => {
    if (initialLoad) {
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      setQuery(randomQuery);
      fetchMovies(randomQuery, 1);
      setInitialLoad(false);
    } else if (query) {
      fetchMovies(query, page);
    }
  }, [query, page]);

  async function fetchMovies(q, p = 1) {
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/search`, { params: { q, page: p } });
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setTotalResults(parseInt(res.data.totalResults || '0', 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(res.data?.Error || 'No results found.');
      }
    } catch (e) {
      setError('Error getting data');
    } finally {
      setLoading(false);
    }
  }

  async function openMovie(imdbID) {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/movie`, { params: { id: imdbID } });
      if (res.data) setSelected(res.data);
    } catch {
      setError('Error loading details');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-4 main-container">
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <h1 className="display-6 brand">🎥 CineSight</h1>
          <p className="text-muted">Explore movies with the OMDb API</p>
        </Col>
      </Row>

      <SearchBar onSearch={(q) => { setQuery(q); setPage(1); fetchMovies(q, 1); }} className="mb-4" />

      {initialLoad && <p className="initial-message">Popular movies to start with 🎬</p>}

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <MovieGrid
        movies={movies}
        loading={loading}
        onOpen={openMovie}
      />

      {totalResults > 0 && (
        <Pagination
          totalResults={totalResults}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
      )}

      {selected && <MovieModal movie={selected} onHide={() => setSelected(null)} />}
    </Container>
  );
}
