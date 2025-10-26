import React, { useState } from "react";
import { Modal, Button, Image, Row, Col, Badge } from "react-bootstrap";
import { FaFilm, FaUser, FaClock, FaGlobe, FaAward } from "react-icons/fa";

export default function MovieModal({ movie, onHide }) {
  const [showJSON, setShowJSON] = useState(false);

  if (!movie) return null;

  return (
    <>
      {/* Main Movie Modal */}
      <Modal show={true} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaFilm className="me-2 text-primary" />
            {movie.Title} ({movie.Year})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Image
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
                fluid
                rounded
              />
            </Col>
            <Col md={8}>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><FaUser className="me-1 text-warning" /><strong>Director:</strong> {movie.Director}</p>
              <p><FaUser className="me-1 text-warning" /><strong>Writer:</strong> {movie.Writer}</p>
              <p><FaUser className="me-1 text-warning" /><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
              <p><FaClock className="me-1 text-success" /><strong>Runtime:</strong> {movie.Runtime}</p>
              <p><FaGlobe className="me-1 text-info" /><strong>Country:</strong> {movie.Country}</p>
              <p><strong>Language:</strong> {movie.Language}</p>
              {movie.Awards && <p><FaAward className="me-1 text-danger" /><strong>Awards:</strong> {movie.Awards}</p>}

              <p>
                <strong>Ratings:</strong>{" "}
                {movie.Ratings?.map((r, i) => (
                  <Badge key={i} bg="info" text="dark" className="me-1 mb-1">
                    {r.Source}: {r.Value}
                  </Badge>
                ))}
              </p>

              <Button variant="secondary" onClick={() => setShowJSON(true)}>
                View Raw JSON
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* JSON Modal */}
      <Modal show={showJSON} onHide={() => setShowJSON(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Raw JSON of {movie.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="json-display">
            <pre>{JSON.stringify(movie, null, 2)}</pre>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJSON(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
