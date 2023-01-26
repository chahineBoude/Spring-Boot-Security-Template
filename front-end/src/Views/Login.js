import React, { Fragment, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "./../utils/fetchService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLogInRequest() {
    if (!jwt) {
      let bodyData = {
        username: username,
        password: password,
      };
      /* fetch("http://localhost:8080/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else return Promise.reject("Invalid Username or Password");
        }) */
      ajax("http://localhost:8080/api/auth/login", jwt, "POST", bodyData)
        .then((data) => {
          const token = data["token"];
          setJwt(token);
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <Fragment>
      <Container className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <h1>Login</h1>
          <Form.Label className="fs-3">username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fs-3">password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col className="mt-2">
            <div>
              <Button
                id="submit"
                type="button"
                size="lg"
                onClick={() => sendLogInRequest()}
              >
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Login;
