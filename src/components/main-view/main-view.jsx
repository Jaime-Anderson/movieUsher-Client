import {useState} from "react";

import {MovieCard} from "../movie-card/movie-card";

import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1, 
      image: "https://m.media-amazon.com/images/I/81TWj3zTsQL._RI_.jpg",
      title: "Corpse Bride", 
      description: "When a shy groom practices his wedding vows in the inadvertent presence of a deceased woman, she rises from the grave assuming he has married her. -IMDb",
      genre: "Animation",
      director: "Tim Burton"
    },
    {
      id: 2, 
      image: "https://m.media-amazon.com/images/I/91bhPto4BZL._RI_.jpg",
      title: "The Hangover",
      description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing. -IMDb", 
      genre: "Comedy",
      director: "Todd Phillips"
    },
    {
      id: 3, 
      image: "https://m.media-amazon.com/images/I/51qGDT4c6WL._AC_UF894,1000_QL80_.jpg",
      title: "Insidious", 
      description: "A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further. -IMDb",
      genre: "Horror",
      director: "James Wan"
    },
  ]);


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