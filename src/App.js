import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import MovieList from './MovieList';
import Filter from './Filter';
import MovieDescription from './MovieDescription';

function App() {
  // Notre tableau d'état initialisé avec l'identifiant et l'URL de la bande-annonce
  const [movies, setMovies] = useState([
    {
      id: "inception",
      title: "Inception",
      description: "Un voleur de génie, spécialisé dans l'art dangereux de l'extraction, s'approprie les secrets corporatifs les plus précieux pendant la phase de rêve. Désormais recherché, on lui propose une ultime mission pour retrouver sa vie d'avant : l'inception, qui consiste à implanter une idée dans l'esprit d'un individu.",
      posterURL: "https://unsplash.com",
      rating: 5,
      trailerURL: "https://youtube.com"
    },
    {
      id: "interstellar",
      title: "Interstellar",
      description: "Alors que la Terre se meurt, un groupe d'explorateurs et de scientifiques entreprend la mission la plus importante de l'histoire humaine. À bord du vaisseau Endurance, ils traversent un trou de ver récemment découvert afin de trouver une nouvelle planète habitable pour l'humanité.",
      posterURL: "https://unsplash.com",
      rating: 4,
      trailerURL: "https://youtube.com"
    },
    {
      id: "gladiator",
      title: "Gladiator",
      description: "Le général romain Maximus est le plus fidèle soutien de l'empereur Marc Aurèle. Lorsque le fils jaloux de ce dernier, Commode, s'empare du pouvoir et massacre la famille de Maximus, celui-ci est capturé et transformé en gladiateur. Sa quête de justice va faire trembler Rome.",
      posterURL: "https://unsplash.com",
      rating: 5,
      trailerURL: "https://youtube.com"
    }
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 1,
    trailerURL: ""
  });

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.posterURL || !newMovie.description || !newMovie.trailerURL) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    // Génération automatique d'un identifiant à partir du titre nettoyé
    const cleanId = newMovie.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    
    setMovies([...movies, { ...newMovie, id: cleanId, rating: Number(newMovie.rating) }]);
    setNewMovie({ title: "", description: "", posterURL: "", rating: 1, trailerURL: "" });
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRating = ratingFilter ? movie.rating >= Number(ratingFilter) : true;
    return matchesTitle && matchesRating;
  });

  return (
    <Router>
      <Routes>
        
        {/* Route Principale : Accueil avec filtres, liste et formulaire d'ajout */}
        <Route path="/" element={
          <Container className="py-5" style={{ maxWidth: '1200px' }}>
            <header className="text-center mb-5">
              <h1 className="fw-black text-uppercase text-primary display-4">🍿 CinéZone</h1>
              <p className="text-muted">Gréer, filtrer et explorer des films</p>
            </header>

            <Row className="g-5">
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
                        rows={2} 
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                        placeholder="Résumé de l'intrigue..." 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">URL du Poster (Image)</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={newMovie.posterURL}
                        onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
                        placeholder="https://..." 
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">Lien Embed de la Bande-Annonce</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={newMovie.trailerURL}
                        onChange={(e) => setNewMovie({ ...newMovie, trailerURL: e.target.value })}
                        placeholder="https://youtube.com..." 
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
        } />

        {/* Route Dynamique : Page de description et bande-annonce pour chaque film */}
        <Route path="/movie/:id" element={<MovieDescription movies={movies} />} />

      </Routes>
    </Router>
  );
}

export default App;
