import { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView =({user, token, movies, onLoggedOut, updateUser }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthday
    }

    fetch('https://movie-usher.herokuapp.com/users/${user.username}', {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ${token}',
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("User information change failed");
        return false;
      }
    })
    .then(user => {
      if (user) {
        alert("User information successfully changed!");
        updateUser(user);
      }
    })
    .catch(e => {
      alert(e);
    });
  }

  const deleteAccount = () => {
    console.log("account-delete")
    fetch('https://movie-usher.herokuapp.com/users/${user.username}', {
      method: "DELETE",
      headers: { Authorization: 'Bearer ${token}' }
    })
    .then(response => {
      if (response.ok) {
        alert("Account deleted");
        onLoggedOut();
      } else {
        alert("Account could not be deleted");
      }
    })
    .catch(e => {
      alert(e);
    });
  }

  return (
    <>
      <Row>
        <Col md={6}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Your Information</Card.Title>
              <p>Username: {username}</p>
              <p>Email: {email}</p>
              <p>Birthday: {birthday}</p>
            </Card.Body>
          </Card>
          <Button variant="danger" onClick={() => {
            if (confirm("Do you really want to delete your account?")) {
              deleteAccount();
            }
          }}>Delete user account</Button>
        </Col>
        <Col md={6}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Update your info</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        minLength="5"
                        className="bg-light"
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="8"
                        className="bg-light"
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="bg-light"
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthdate:</Form.Label>
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                        className="bg-light"
                      />
                  </Form.Group>
                  <Button className="mt-3" variant="primary" type="submit">Update</Button>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center mb-5">Favorite Movies</h2>
        {user.favoriteMovies ? (
          movies
            .filter((movie) => user.favoriteMovies.includes(movie.id))
            .map((movie) => <MovieCard movie={movie} key={movie.id} />)
        ) : (
          <p>No favorite movies</p>
        )}
      </Row>
    </>
  );
}