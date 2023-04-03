import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

  useEffect(() => {
    setIsFavorite(user.favoriteMovies.includes(movie.id));
    window.scrollTo(0, 0);
  }, [movieId])

  const addFavorite = () => {
    fetch(`https://movie-usher.herokuapp.com/users/${user.username}/movies/${movieId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert("Successfully added to favorites");
            setIsFavorite(true);
            updateUser(user);
        }
    })
    .catch(e => {
        alert(e);
    });
  }

  const removeFavorite = () => {
    fetch(`https://myflixapi-11d1.onrender.com/users/${user.username}/movies/${movieId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert("Successfully deleted from favorites");
            setIsFavorite(false);
            updateUser(user);
        }
    })
    .catch(e => {
        alert(e);
    });
  }

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
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
        <button className="back-button" variant="link">Back</button>
      </Link>
      {isFavorite ?
      <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from Favorites</Button>
      : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to Favorites</Button>
      }
    </div>
  );
};