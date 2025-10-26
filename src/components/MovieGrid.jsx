import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, loading, onOpen }){
  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (!movies || movies.length === 0) return <p className="mt-3 text-muted">No results found.</p>;

  return (
    <Row className="g-3 mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
      {movies.map(m => (
        <Col key={m.imdbID}>
          <MovieCard movie={m} onOpen={onOpen}/>
        </Col>
      ))}
    </Row>
  );
}
