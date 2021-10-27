import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import LogOut from "../components/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  return (
      <Navbar variant="light" expand="lg" style={{ marginTop: "25px" }}>
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "cooper-black-std, serif",
              fontSize: "1.8em",
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
            {
              <Nav className="me-auto">
                {/* <Nav.Link
                href="/dashboard"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                Dashboard
              </Nav.Link>}
              <Nav.Link
                href="/calendar"
                style={{ color: "#1c1c1c", fontSize: "15px", fontWeight: 400 }}
              >
                Calendar
              </Nav.Link> */}
                <Nav.Link
                  href="/about-us"
                  style={{
                    color: "#1c1c1c",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  About Us
                </Nav.Link>
                <Nav.Link
                  href="/settings"
                  style={{
                    color: "#1c1c1c",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  Settings
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  style={{
                    color: "#b8cd48",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Log In
                </Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;
