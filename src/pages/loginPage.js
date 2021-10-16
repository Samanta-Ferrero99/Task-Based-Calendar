import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import loginImage from "../assets/login.svg";
import Login from "../components/login";

export default function LoginPage() {
  // Styles
  const loginPage = {
    padding: "70px 0px",
  };

  const leftPane = {};

  const title = {
    fontSize: "2.7em",
    fontWeight: "800",
    maxWidth: "500px",
    minWidth: "480px",
  };

  const loginInfo = {
    fontSize: "2.0em",
    fontWeight: "700",
    maxWidth: "490px",
    minWidth: "380px",
    marginTop: "20px",
  };

  const inputLabel = {
    fontSize: "1.2em",
    fontWeight: "300",
    maxWidth: "490px",
    minWidth: "380px",
    marginTop: "20px",
  };

  const bottomNote = {
    fontSize: "1.2em",
    fontWeight: "200",
    marginTop: "20px",
  };

  const rightPane = {
    marginTop: "90px",
    marginLeft: "20px",
  };

  const loginImageStyle = {
    width: "40em",
    marginLeft: "5em",
    marginTop: "10px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  
  return (
    <Container className="loginPage" style={loginPage}>
      {/* <LogoutHooks /> */}
      <Row>
        <Col className="leftPane" md="6" style={leftPane}>
          <h1 className="hook" style={title}>
            Log in
          </h1>
          <h4 className="bottomNote" style={bottomNote}>
            Please note that you will be redirected to Google's OAuth page to
            authenticate your login details.
          </h4>
          <Login />
        </Col>
      </Row>
      <Row>
        <img
          src={loginImage}
          alt="Login"
          className="loginImage"
          style={loginImageStyle}
        />
      </Row>
    </Container>
  );
}
