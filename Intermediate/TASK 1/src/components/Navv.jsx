import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
const Navv = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();
  const signout = () => {
    window.localStorage.clear();
    dispatch("signout");
    navigate("/");
  };
  const url = () => {
    navigate("/url-list/");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Link Shortener App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1" hidden>
              Home
            </Nav.Link>
            <Nav.Link hidden href="#action2">
              Link
            </Nav.Link>
            <NavDropdown hidden title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" hidden disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button onClick={url} variant="outline-success" className="mx-2">
              My Url
            </Button>
            <Button onClick={signout} variant="outline-primary">
              Sign out
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navv;
