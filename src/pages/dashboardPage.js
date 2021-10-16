import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import heroImage from "../assets/hero-image.svg";

/**
 * Landing page for the application.
 */
export default function DashboardPage() {
  // Styles

  const rightPane = {

  };

  const title = {
    fontSize: "2.4em",
    fontWeight: "800",
    maxWidth: "500px",
    minWidth: "480px",
    paddingTop: "20px",
  };

  const chroniclesTitle = {
    fontSize: "1.3em",
    fontWeight: "700",
    maxWidth: "490px",
    minWidth: "380px",
    marginTop: "20px",
  };

  const leftPane = {};

  const heroImageStyle = {
    width: "33em",
    marginLeft: "0em",
    marginTop: "40px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  const getStartedButton = {
    marginTop: "20px",
    marginLeft: "5px",
    marginRight: "5px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
  };

  // End of styles

  return (
    <Container className="dashboardPage">
      <h1 className="title" style={title}>
        Good Evening (Username)
      </h1>
      <Row>
        <h2 style={chroniclesTitle}>new moment</h2>
      </Row>
      <Row>
        <Col className="leftPane" md="4" style={leftPane}>
          <h2 className="chroniclesTitle" style={chroniclesTitle}>
            chronicles
          </h2>
          <Card>
            <Card.Title>Hello</Card.Title>
          </Card>
        </Col>
        <Col className="rightPane" md="4" style={rightPane}>
          <h2 className="chroniclesTitle" style={chroniclesTitle}>
            available tasks
          </h2>
          <Card>
            <Card.Title>Hello</Card.Title>
          </Card>
        </Col>
        <Col className="rightPane" md="4" style={rightPane}>
          <h2 className="chroniclesTitle" style={chroniclesTitle}>
            approaching deadlines
          </h2>
          <Card>
            <Card.Title>Hello</Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
