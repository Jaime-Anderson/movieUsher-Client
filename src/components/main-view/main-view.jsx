import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

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
        <Row className="justify-content-center">
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
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }} updateUser={updateUser}/>
                )
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
