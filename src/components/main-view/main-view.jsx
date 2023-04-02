import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

import { Button, Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) return;
    fetch("https://movie-usher.herokuapp.com/movies", {
      headers: {Authorization: 'Bearer ${token}' }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          }
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <>
      {user && (
        <Button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}>
          Logout
        </Button>
      )}

      <Row>
        {!user ? (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
            or
            <SignupView />
          </>
        ) : selectedMovie ? (
          <>
            <MovieView movie={selectedMovie} 
              onBackClick={() => 
                setSelectedMovie(null)} />
          </>
        ) : movies.length === 0 ? (
            <div>The list is empty.</div>
        ) : (
          <>       
              {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie)
                    }}
                  />
                </Col>
              ))}
          </>
        )}
      </Row>
    </>
  );
}