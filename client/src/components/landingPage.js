import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col }  from "react-bootstrap";
import heroImage from "../assets/hero-image.svg";

/**
 * Landing page for the application.
 */
export default function LandingPage() {
  // Styles
  const landingPage = {
    padding: "70px 0px",
  };

  const rightPane = {
    marginTop: "90px",
    marginLeft: "20px",
  };

  const hook = {
    fontSize: "2.7em",
    fontWeight: "800",
    maxWidth: "500px",
    minWidth: "480px",
  };

  const subHook = {
    fontSize: "1.2em",
    fontWeight: "300",
    maxWidth: "490px",
    minWidth: "380px",
    marginTop: "20px",
  };

  const leftPane = {
   
  };

  const heroImageStyle = {
    width: "33em",
    marginLeft: "0em",
    marginTop: "40px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  const getStartedButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
  };

  // End of styles

  return (
    <Container className="landingPage" style={landingPage}>
      <Row>
        <Col className="rightPane" md="6" style={rightPane}>
          <h1 className="hook" style={hook}>
            We're not your average task planner
          </h1>
          <h3 className="subHook" style={subHook}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            imperdiet ipsum ut tortor euismod elementum. Quisque nec molestie
            ligula, mattis viverra dolor.
          </h3>
          <Link to="/login"><Button className="getStartedButton" style={getStartedButton}>
            Get Organized
          </Button>
          </Link>
        </Col>
        <Col className="leftPane" md="auto" style={leftPane}>
          <img
            src={heroImage}
            alt="Hero"
            className="heroImage"
            style={heroImageStyle}
          />
        </Col>
      </Row>
    </Container>
  );
} 