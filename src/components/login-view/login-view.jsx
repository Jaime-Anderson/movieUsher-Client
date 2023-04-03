import { useState } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-usher.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("no such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  }; 

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Sign In!</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlID="formUsername">
                    <Form.Label>
                      Username:
                    </Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                        placeholder="Enter your username"
                      />
                  </Form.Group>
                  <Form.Group controlID="formPassword">
                    <Form.Label>
                      Password:
                    </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        placeholder="Enter your password"
                      />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
};