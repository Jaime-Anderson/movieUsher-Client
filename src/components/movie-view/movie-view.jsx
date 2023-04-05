import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  console.log(JSON.stringify(user, null, 2));

  const favMovies = (user.Favorites || []).includes(movie?.id);
  const [isFavorite, setIsFavorite] = useState(favMovies);

  useEffect(() => {
    setIsFavorite(favMovies);
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://movie-usher.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          alert("Added to Favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://movie-usher.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          alert("Deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  if (!movie) {
    return null;
  }

  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <Link to="/">
        <Button variant="link">Back</Button>
      </Link>
      {isFavorite ? (
        <Button variant="danger" className="ms-2" onClick={removeFavorite}>
          Remove from Favorites
        </Button>
      ) : (
        <Button variant="success" className="ms-2" onClick={addFavorite}>
          Add to Favorites
        </Button>
      )}
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
};
