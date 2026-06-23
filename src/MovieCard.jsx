import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const { id, title, description, posterURL, rating } = movie;

  return (
    // Le composant Link permet une navigation fluide sans recharger la page complète
    <Link to={`/movie/${id}`} className="text-decoration-none text-white h-100 d-block">
      <Card className="h-100 shadow-sm border-0 bg-dark text-white rounded-3 overflow-hidden movie-card-hover">
        <Card.Img 
          variant="top" 
          src={posterURL} 
          alt={title} 
          style={{ height: '350px', objectFit: 'cover' }} 
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="fw-bold fs-5 text-truncate mb-2">{title}</Card.Title>
            <Card.Text className="text-muted small text-start" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {description}
            </Card.Text>
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center border-top border-secondary pt-2">
            <span className="text-secondary small">Évaluation :</span>
            <span className="badge bg-warning text-dark fw-bold px-2 py-1 fs-6">⭐ {rating}/5</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default MovieCard;
