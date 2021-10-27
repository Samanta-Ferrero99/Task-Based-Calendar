import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

/**
 * About us page for the application.
 */
export default function AboutUsPage() {
  // Styles
  const aboutUsPage = {
    padding: "40px 0px",
  };

  const rightPane = {
    marginLeft: "10px",
    paddingTop: "20px",
  };

  const hook = {
    fontSize: "2.7em",
    fontWeight: "800",
    textAlign: "left",
  };

  const contact = {
    fontSize: "2.7em",
    fontWeight: "800",
  };

  const subHook = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    textAlign: "left",
  };

  const labels = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    display: "block",
  };

  const inputs = {
    display: "block",
    minWidth: "600px",
    maxWidth: "800px",
  };
  const leftPane = {
    marginLeft: "15px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  const getStartedButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
    marginLeft: "0px",
  };

  // End of styles

  return (
    <Container className="aboutUsPage" style={aboutUsPage}>
      <Row>
        <Col className="leftPane" style={leftPane}>
          <h1 className="hook" style={hook}>
            About the Creators
          </h1>
          <h3 className="subHook" style={subHook}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            imperdiet ipsum ut tortor euismod elementum. Quisque nec molestie
            ligula, mattis viverra dolor.
          </h3>

          <h3 className="subHook" style={subHook}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            imperdiet ipsum ut tortor euismod elementum. Quisque nec molestie
            ligula, mattis viverra dolor.
          </h3>
        </Col>
      </Row>
      <Row>
        <Col className="rightPane" style={rightPane}>
          <form>
            <h2 className="contact" style={contact}>
              Contact Us
            </h2>
            <label style={labels}>
              Name
              <input style={inputs} type="text" name="name" />
            </label>

            <label className="labels" style={labels}>
              Email
              <input style={inputs} type="text" name="email" />
            </label>

            <label className="labels" style={labels}>
              Subject
              <input style={inputs} type="text" name="subject" />
            </label>

            <label className="labels" style={labels}>
              Message
              <textarea style={inputs} type="textarea" name="name" />
            </label>

            <Button className="getStartedButton" style={getStartedButton}>
              Send Message
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
