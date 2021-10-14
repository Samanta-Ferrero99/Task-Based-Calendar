import React from "react";
import { Button, Container, Row, Col }  from "react-bootstrap";
import loginImage from "../assets/login.svg";


export default function LoginPage() {
     // Styles
  const loginPage = {
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

  const loginImageStyle = {
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

  return (
    <Container className="loginPage" style={loginPage}>
      <Row>
        <Col className="rightPane" md="6" style={rightPane}>
          <h1 className="hook" style={hook}>
            Log in
          </h1>
          <img
            src={loginImage}
            alt="Login Image"
            className="loginImage"
            style={loginImageStyle}
          />
        </Col>
        <Col className="leftPane" md="auto" style={leftPane}>
            <h3 className="subHook" style={subHook}>
                Username
            </h3>
            <label>
                <input type="text" name="username" />
            </label>
            <h3 className="subHook" style={subHook}>
                Password
            </h3>
            <label>
                <input type="text" name="password" />
            </label>
        <br />
        <Button className="getStartedButton" style={getStartedButton} input type="submit" name="login">
            Log In
          </Button>
        </Col>
      </Row>
    </Container>
  );
}