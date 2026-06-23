import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MovieList from './MovieList';
import Filter from './Filter';

function App() {
  // Liste initiale de films de démonstration
  const [movies, setMovies] = useState([
    {
      title: "Inception",
      description: "Un voleur qui s'approprie les secrets corporatifs à travers l'usage de la technologie de partage de rêves.",
      posterURL: "https://unsplash.com",
      rating: 5
    },
    {
      title: "Interstellar",
      description: "Une équipe d'explorateurs voyage au-delà de cette galaxie pour découvrir si l'humanité a un avenir parmi les étoiles.",
      posterURL: "https://unsplash.com",
      rating: 4
    },
    {
      title: "Gladiator",
      description: "Un ancien général romain cherche à se venger de l'empereur corrompu qui a assassiné sa famille.",
      posterURL: "https://unsplash.com",
      rating: 5
    }
  ]);

  // États pour la gestion des filtres
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  // États pour le formulaire de nouveau film
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 1
  });

  // Gestionnaire d'ajout de film
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.posterURL || !newMovie.description) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    setMovies([...movies, { ...newMovie, rating: Number(newMovie.rating) }]);
    // Réinitialisation du formulaire
    setNewMovie({ title: "", description: "", posterURL: "", rating: 1 });
  };

  // Logique du filtre : Combine la recherche textuelle et l'évaluation minimale
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRating = ratingFilter ? movie.rating >= Number(ratingFilter) : true;
    return matchesTitle && matchesRating;
  });

  return (
    <Container className="py-5" style={{ maxWidth: '1200px' }}>
      <header className="text-center mb-5">
        <h1 className="fw-black text-uppercase tracking-wider text-primary display-4">🍿 CinéZone</h1>
        <p className="text-muted">Gérez et filtrez votre propre bibliothèque de films</p>
      </header>

      <Row className="g-5">
        {/* Section Formulaire à gauche / en haut */}
        <Col lg={4}>
          <div className="p-4 bg-white rounded-3 shadow-sm border sticky-top" style={{ top: '20px' }}>
            <h5 className="fw-bold text-dark mb-3">➕ Ajouter un Film</h5>
            <Form onSubmit={handleAddMovie}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Titre du film</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  placeholder="Ex: Matrix" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  placeholder="Résumé de l'intrigue..." 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">URL de l'image (Poster)</Form.Label>
                <Form.Control 
                  type="text" 
                  value={newMovie.posterURL}
                  onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
                  placeholder="https://..." 
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Note ({newMovie.rating}/5)</Form.Label>
                <Form.Range 
                  min="1" 
                  max="5" 
                  value={newMovie.rating}
                  onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 py-2 fw-bold">
                Ajouter à la liste
              </Button>
            </Form>
          </div>
        </Col>

        {/* Section Liste & Filtres à droite */}
        <Col lg={8}>
          <Filter 
            titleFilter={titleFilter} 
            setTitleFilter={setTitleFilter} 
            ratingFilter={ratingFilter} 
            setRatingFilter={setRatingFilter} 
          />
          <MovieList movies={filteredMovies} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
