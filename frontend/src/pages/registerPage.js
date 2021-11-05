import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, FormControl, Button, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Login from "../components/googleLogin";
import AuthService from "../services/authService";

export default function RegisterPage() {

  const [createNew, setCreateNew] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const history = useHistory();

  const setField = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { username, email, password, password2 } = user;
    const newErrors = {};
    if (!username || username === "") newErrors.username = "Username cannot be blank";
    if (!email || email === "") newErrors.email = "Email cannot be blank";
    else if (!password || password === "")
      newErrors.password = "Password cannot be blank";
    else if (!password2 || password2 === "")
      newErrors.password2 = "Password confirmation cannot be blank";

    return newErrors;
  };

  async function handleRegister() {
    AuthService.register(user).then(
      (response) => {
        return history.push("/welcome");
      },
      (error) => {
        console.log("error");
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors :)
      handleRegister();
    }
  };

  return (
    <Container
      className="loginPage"
      id="loginPage"
      style={{ paddingLeft: "15px" }}
    >
      <Row>
        <Col className="leftPane" md="6" id="leftPane">
          <h1 className="hook" id="cooperHeading1">
            Some inspiring text here.
          </h1>
          <h4 className="bottomNote" id="subHeading1">
            And a snappy subheading to make us sound relatable.
          </h4>
        </Col>
      </Row>
      {createNew ? (
        <Row style={{ paddingTop: "30px" }}>
          <Col>
            <span
              className="bottomNote"
              id="subHeading1"
              style={{ fontSize: "20px" }}
            >
              Sign up with email
            </span>
            <Button
              id="closeButton"
              variant="outline-secondary"
              onClick={() => setCreateNew(false)}
              style={{ marginLeft: "150px" }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: "#b8cd48", alignItems: "center" }}
              />
            </Button>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <FormControl
                  type="text"
                  onChange={(e) => setField("username", e.target.value)}
                  required
                  isInvalid={!!errors.username}
                  id="field"
                  style={{ marginTop: "10px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <div id="fieldBreak" />
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <FormControl
                  id="field"
                  type="text"
                  onChange={(e) => setField("email", e.target.value)}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <div id="fieldBreak" />
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <FormControl
                  id="field"
                  type="text"
                  onChange={(e) => setField("password", e.target.value)}
                  required
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div id="fieldBreak" />
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <FormControl
                  id="field"
                  type="text"
                  onChange={(e) => setField("password2", e.target.value)}
                  required
                  isInvalid={!!errors.password2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password2}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <div style={{ height: "20px" }} />
            <div className="d-grid gap-2" style={{ width: "350px" }}>
              <Button
                variant="dark"
                id="button1"
                onClick={(e) => handleSubmit(e)}
              >
                Create My Account
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row style={{ marginTop: "20px" }}>
            <Button
              id="button1"
              variant="dark"
              onClick={() => setCreateNew(true)}
              style={{ width: "500px" }}
            >
              Sign up with email
            </Button>
            {/* <Col md="5" style={{ width: "200px" }}>
              <Login register={true} />
            </Col>
            <Col md="5">
              <span style={{ marginRight: "25px" }}>or</span>
              <Button
                id="button1"
                variant="dark"
                onClick={() => setCreateNew(true)}
              >
                Sign up with email
              </Button>
            </Col> */}
          </Row>
        </>
      )}

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