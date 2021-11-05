import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import heroImage from "../assets/hero-image.svg";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './calendar.css';

/**
 * Landing page for the application.
 */
export default function CalendarPage() {
  // Styles
  const landingPage = {
    padding: "70px 0px",
  };

  const rightPane = {
    marginTop: "90px",
    marginLeft: "20px",
  };

  const title = {
    fontSize: "2.7em",
    fontWeight: "800",
    maxWidth: "500px",
    minWidth: "480px",
    paddingTop: "20px",
  };

  const subHook = {
    fontSize: "1.2em",
    fontWeight: "300",
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
    <Container className="calendarPage">
      <Row>
        <Col className="rightPane" md="6">
          <h1 className="title" style={title}>
            Calendar
          </h1>
        </Col>
        {/* <Col className="leftPane" md="auto" style={leftPane}>
          <img
            src={heroImage}
            alt="Hero"
            className="heroImage"
            style={heroImageStyle}
          />
        </Col> */}
      </Row>
      <Row>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Row>
    </Container>
  );
}
