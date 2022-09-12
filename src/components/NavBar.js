import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const Navibar = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/decentralized-curriculum-vitae">
          <h1>DeFi CV</h1>
        </Navbar.Brand>
      </Container>
      <Container className="pages">
        <Nav>
          <Link className="Link" to="/CVs">
            <Button variant="outline-light">CVs</Button>
          </Link>
          <Link className="Link" to="/AddCV">
            <Button variant="outline-light">Add CV</Button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
