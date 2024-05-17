import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
const Register = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const add = (e) => {
    e.preventDefault();
    if (
      username == null ||
      email == null ||
      password1 == null ||
      password2 == null
    ) {
      alert("pleasse fill up all fields");
    } else if (password1 === password2) {
      let formField = new FormData();
      formField.append("username", username);
      formField.append("password", password1);
      formField.append("password2", password2);
      formField.append("email", email);
      console.log(username, email, password1);
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/user/signup/",

        data: formField,
      })
        .then((response) => {
          if (response.status == 201) {
            console.log(response.status);
            window.localStorage.setItem("token", response.data["access"]);
            dispatch("addProfile");
            navigate("/link-shortener/");
          }
        })
        .catch((e) => {
          alert("Try with different user name");
        });
    } else {
      alert("passwords did not match");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <h1 className="text-center text-primary">Sign up !</h1>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
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
                onChange={(e) => setPassword1(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword2(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button onClick={add} variant="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
};

export default Register;
