import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Row, Col, Ratio } from 'react-bootstrap';

function MovieDescription({ movies }) {
  // Extraction du paramètre dynamique "id" configuré dans l'URL
  const { id } = useParams();
  
  // Recherche du film correspondant dans le tableau
  const movie = movies.find((m) => m.id === id);

  // Gestion du cas où l'identifiant du film n'existe pas
  if (!movie) {
    return (
      <Container className="text-center py-5 text-white bg-dark min-vh-100">
        <h2>🎬 Film non trouvé</h2>
        <p className="text-muted">La page demandée n'existe pas ou le film a été retiré.</p>
        <Link to="/">
          <Button variant="primary" className="mt-3">Retourner à l'accueil</Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <Container style={{ maxWidth: '900px' }}>
        
        {/* Lien de retour à la liste principale */}
        <Link to="/" className="mb-4 d-inline-block">
          <Button variant="outline-light" className="rounded-pill px-4">
            ← Retour à l'accueil
          </Button>
        </Link>

        {/* Détails du Film */}
        <Row className="mt-4 mb-5 align-items-center">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <img 
              src={movie.posterURL} 
              alt={movie.title} 
              className="img-fluid rounded-3 shadow-lg"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h1 className="fw-black display-5 mb-2">{movie.title}</h1>
            <div className="mb-3">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 fs-6">⭐ {movie.rating}/5</span>
            </div>
            <h5 className="text-secondary fw-bold">Synopsis</h5>
            <p className="text-muted leading-relaxed" style={{ fontSize: '1.1rem' }}>
              {movie.description}
            </p>
          </Col>
        </Row>

        {/* Section Bande-annonce (Vidéo Intégrée) */}
        <div className="border-top border-secondary pt-5">
          <h3 className="fw-bold mb-4 text-center">📺 Bande-Annonce Officielle</h3>
          <div className="shadow-lg rounded-3 overflow-hidden">
            <Ratio aspectRatio="16x9">
              <iframe
                src={movie.trailerURL}
                title={`Bande-annonce de ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Ratio>
          </div>
        </div>

      </Container>
    </div>
  );
}

export default MovieDescription;
