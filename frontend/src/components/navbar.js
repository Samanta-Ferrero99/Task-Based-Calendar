import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

import EventBus from "../utils/eventBus";
import AuthService from "../services/authService";
import UserService from "../services/userService";


// Top navigation bar
const NavBar = (isLoggedIn) => {

  const history = useHistory();

  const [user, setUser] = React.useState(isLoggedIn ? AuthService.getCurrentUser() : undefined
  );
  const [authorized, setAuthorized] = React.useState(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      UserService.verifyUserAuth().then(
        (response) => {
          setAuthorized(true);
          setUser(AuthService.getCurrentUser);
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
            setAuthorized(false);
            setUser(undefined);
          }
        }
      );
    } else {
      setAuthorized(false);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser !== user && currentUser !== undefined) {
      setUser(currentUser);
    }
  }, [user]);

  const handleLogoutButton = () => {
    AuthService.logout();
    EventBus.dispatch("logout");
    return history.push("/");
  }

  if (!authorized) {
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
                <Button
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
