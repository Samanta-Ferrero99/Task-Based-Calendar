import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from "../components/login";
import "./loginPage.css";

export default function LoginPage() {  
  const [loginModalShow, setLoginModalShow] = React.useState(false);
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) return <Redirect to='dashboard' />;

  return (
    <Container className="loginPage" id="loginPage" style={{paddingLeft: "15px"}}>
      <Row>
        <Col className="leftPane" md="6" id="leftPane">
          <h1 className="hook" id="cooperHeading1">
            This is your story.
          </h1>
          <h4 className="bottomNote" id="subHeading1">
            Let us keep you organized along the way.
          </h4>
        </Col>
      </Row>
      <Row className="begin" id="begin">
        <Col>
          <div className="d-grid gap-2">
            <Button variant="dark" id="button1" href="/register">
              Begin
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="login" id="login">
        <Col>
          <h4
            className="alreadyJoined"
            id="subHeading1"
            style={{ paddingTop: "20px" }}
          >
            Already joined us?
          </h4>
          <div className="d-grid gap-2">
            <Button
              style={{ marginTop: "20px" }}
              variant="dark"
              id="button2"
              onClick={() => setLoginModalShow(true)}
            >
              Log in
            </Button>
          </div>
        </Col>
      </Row>

      <LoginForm
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />

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