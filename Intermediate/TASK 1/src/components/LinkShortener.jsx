import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";

const LinkShortener = () => {
  const [date, setDate] = useState(null);
  const [url, setUrl] = useState(null);
  const [shorturl, setShortUrl] = useState(null);
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();

  const add = (e) => {
    e.preventDefault();
    let formField = new FormData();
    formField.append("main_url", url);
    formField.append("expired_date", date);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/link/",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      data: formField,
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 401) {
          dispatch("signout");
          navigate("/");
        }
        setShortUrl(response.data["short url"]);
      })
      .catch((e) => {
        alert("Enter valid url");
      });
  };
  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary">Link Shortener !</h1>

      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Url:</Form.Label>
              <Form.Control
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="Enter Url"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date time:</Form.Label>

              <Form.Control
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                placeholder="Enter Url"
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button onClick={add} variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg={3}></Col>
        {shorturl && (
          <h3 className="text-center mt-5">
            {" "}
            <span className="text-success">Short Urt</span> : {shorturl}
          </h3>
        )}
      </Row>
    </Container>
  );
};

export default LinkShortener;
