import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "./StateProvider";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const add = (e) => {
    e.preventDefault();
    let formField = new FormData();
    formField.append("username", username);
    formField.append("password", password);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/user/signin/",
      data: formField,
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          window.localStorage.setItem("token", response.data["access"]);
          dispatch("addProfile");
          navigate("/link-shortener/");
        } else {
          alert("User name or password not match");
        }
      })
      .catch((e) => {
        alert("User name or password not match");
      });
  };
  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary">Sign In !</h1>
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User name:</Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <p>
              Not have an account ? <Link to="/signup">Sign up</Link>{" "}
            </p>
            <div className="text-center">
              <Button onClick={add} variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
};

export default Login;
