<<<<<<< Updated upstream
import {useState, useEffect} from "react";

import {MovieCard} from "../movie-card/movie-card";

import {MovieView} from "../movie-view/movie-view";
=======
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
>>>>>>> Stashed changes

export const MainView = () => {
  const [movies, setMovies] = useState([]);
<<<<<<< Updated upstream
=======
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
>>>>>>> Stashed changes

  useEffect(() => {
    fetch("https://movie-usher.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} 
        onBackClick={() => 
          setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }

  return (
<<<<<<< Updated upstream
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie)
          }}
        />
      ))}
    </div>
)};
=======
    <BrowserRouter>
      <>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear()
          }}
        />
        <Row>
          <Routes>
            <Route 
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : ( 
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movie={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movies.id} md={3}>
                          <MovieCard movie={movies} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </> 
    </BrowserRouter>
  );
}
>>>>>>> Stashed changes
