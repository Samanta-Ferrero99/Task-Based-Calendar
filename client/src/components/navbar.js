import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function NavBar() {

  return (
    <Navbar variant="light" expand="lg" style={{ marginTop: "25px" }}>
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            fontFamily: "Open Sans",
            fontWeight: "800",
            fontSize: "1.6em",
            color: "#b8cd48",
          }}
        >
          chronicle
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ border: "0px solid white" }}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "#b8cd48" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/"
              style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
            >
              How it Works
            </Nav.Link>
            <Nav.Link
              href="/login"
              style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
            >
              Log In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}