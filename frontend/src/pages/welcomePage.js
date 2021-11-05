import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function WelcomePage() {

  return (
    <Container
      className="loginPage"
      id="loginPage"
      style={{ paddingLeft: "15px" }}
    >
      <Row>
        <Col className="leftPane" md="6" id="leftPane">
          <h1 className="hook" id="cooperHeading1">
            Welcome aboard!
          </h1>
          <h4 className="bottomNote" id="subHeading1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            interdum non nunc eu accumsan. Nullam sagittis vehicula leo, in
            commodo justo feugiat vel.
          </h4>
        </Col>
      </Row>
      <Row className="login" id="login">
        <Col>
          <h4
            className="alreadyJoined"
            id="subHeading1"
            style={{ paddingTop: "20px" }}
          >
            Learn the ins and outs of using chronicle with our new-user walkthrough
          </h4>
        </Col>
      </Row>

      {/* <Row>
        <img
          src={loginImage}
          alt="Login"
          className="registerImage"
          id="loginImage"
        />
      </Row> */}
    </Container>
  );
}