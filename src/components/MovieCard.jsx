import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function MovieCard({ movie, onOpen }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <Card className="movie-card h-100 shadow-sm">
      {hasPoster ? (
        <Card.Img
          variant="top"
          src={movie.Poster}
          className="poster"
        />
      ) : (
        <div className="poster-placeholder d-flex align-items-center justify-content-center">
          <span className="placeholder-text">{movie.Title}</span>
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{movie.Title}</Card.Title>
        <Card.Text className="text-muted">{movie.Year}</Card.Text>
        <Button variant="outline-primary" size="sm" className="mt-auto" onClick={() => onOpen(movie.imdbID)}>
          See more
        </Button>
      </Card.Body>
    </Card>
  );
}
