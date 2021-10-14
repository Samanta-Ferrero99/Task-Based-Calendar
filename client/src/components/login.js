import React from "react";
import { Button, Container, Row, Col }  from "react-bootstrap";
import loginImage from "../assets/login.svg";


export default function LoginPage() {
     // Styles
  const loginPage = {
    padding: "70px 0px",
  };

  const leftPane = {
    
  };

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
    fontSize: "1.0em",
    fontWeight: "200",
    maxWidth: "430px",
    minWidth: "380px",
    marginTop: "20px",
  };

  const rightPane = {
    marginTop: "90px",
    marginLeft: "20px",
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
        <Col className="leftPane" md="6" style={leftPane}>
          <h1 className="hook" style={title}>
            Log in
          </h1>
          <img
            src={loginImage}
            alt="Login"
            className="loginImage"
            style={loginImageStyle}
          />
        </Col>
        <Col className="rightPane" md="auto" style={rightPane}>
            <h2 className="subHook" style={loginInfo}>
              Enter your username and password.
            </h2>
            <h3 className="subHook" style={inputLabel}>
                Username
            </h3>
            <label>
                <input type="text" name="username" />
            </label>
            <h3 className="subHook" style={inputLabel}>
                Password
            </h3>
            <label>
                <input type="text" name="password" />
            </label>
        <br />
        <Button className="getStartedButton" style={getStartedButton} input type="submit" name="login">
            Log In
          </Button>
          <h4 className="bottomNote" style={bottomNote}>
            Please note that you will be redirected to GitHub's OAuth page to authenticate your login details.
          </h4>
        </Col>
      </Row>
    </Container>
  );
}