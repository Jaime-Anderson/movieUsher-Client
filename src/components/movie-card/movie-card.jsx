import React from "react";
import PropTypes from "prop-types";
<<<<<<< Updated upstream

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      onClick={() =>{
      onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
=======
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img varient="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={'/movies/${encodeURIComponent(movie.id)'}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
>>>>>>> Stashed changes
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
};