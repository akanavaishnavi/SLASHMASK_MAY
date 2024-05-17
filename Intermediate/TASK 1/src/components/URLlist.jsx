import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
const URLlist = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const getLink = async () => {
      await axios({
        method: "get",
        url: "http://127.0.0.1:8000/link/",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.status == 401) {
            dispatch("signout");
            navigate("/");
          }
          setData(response.data);
        })
        .catch(() => {
          navigate("/");
        });
    };
    getLink();
  }, []);
  return (
    <div>
      <h1 className="text-center mt-5 text-primary mb-5">Url List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Main Url</th>
            <th>Short Url</th>
            <th>Expire Time</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, i) => (
              <tr>
                <td>{data?.main_url}</td>
                <td>{data?.shorten_url}</td>
                <td>{data?.expired_date}</td>
                <td>{data?.valid ? "Valid" : "Expired"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default URLlist;
