/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from 'react-redux';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { attemptLogout } from '../store/thunks/auth';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


// Top navigation bar
const NavBar = (isLoggedIn) => {

  const { isAuth, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogoutButton = () => {
    console.log("LOGGING OUT...");
    dispatch(attemptLogout());
    dispatch(push('/'));
  }

  if (!isAuth) {
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
  } else {
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
                {/* <Nav.Item>
                  Hello, {user.username}!
                </Nav.Item> */}
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
                  href="/dashboard"
                  style={{
                    color: "#1c1c1c",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  href="/calendar"
                  style={{
                    color: "#1c1c1c",
                    fontSize: "15px",
                    fontWeight: 400,
                  }}
                >
                  Calendar
                </Nav.Link>
                <Button
                  size="sm"
                  id="button1"
                  style={{ width: "100px" }}
                  onClick={() => handleLogoutButton()}
                >
                  Log Out
                </Button>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default NavBar;
