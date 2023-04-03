import { useState } from "react";
import { Button, Form, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    if (username.length < 3) {
      console.log("clicked username");
      setUsernameError(true);
      return;
    }

    if (password.length < 8 ) {
      console.log("clicked pass");
      setPasswordError(true);
      return;
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch("https://movie-usher.herokuapp.com/users", {
      method: "POST", 
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then ((response) => {
      if (response.ok) {
        alert("Signup successful!");
        window.location.reload();
      } else {
        alert("Signup failed.");
      }
    })
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Sign Up!</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlID="formUsername">
                    <Form.Label>
                    Username:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => {setUsername(e.target.value);
                      setUsernameError(false);
                      }}
                      required
                      placeholder="Enter your desired username"
                    />
                    {usernameError && <div>Username is less then 3</div>}
                  </Form.Group>
                  <Form.Group controlID="formPassword">
                    <Form.Label>
                      Password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => {setPassword(e.target.value);
                      setPasswordError(false);
                      }}
                      required
                      placeholder="Your password must be 8 or more characters"
                    />
                    {passwordError && <div>Password is less than 8</div>}
                  </Form.Group>
                  <Form.Group controlID="formEmail">
                    <Form.Label>
                      Email:
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </Form.Group>
                  <Form.Group control="formBirthday">
                    <Form.Label>
                      Birthday:
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit">Signup</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};