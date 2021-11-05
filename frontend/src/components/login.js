import React from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Login from "./googleLogin";
import AuthService from "../services/authService";
import EventBus from "../utils/eventBus";

/**
 * Modal for user Login
 */
export default function LoginForm(props) {
  const [user, setUser] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const history = useHistory();

  const setField = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { email, password } = user;
    const newErrors = {};
    // name errors
    if (!email || email === "") newErrors.email = "Email cannot be blank";
    else if (!password || password === "") newErrors.password = "Password cannot be blank";

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors :)
      handleLogin();
    }
  }

  async function handleLogin() {
    AuthService.login(user).then(
      (response) => {
        console.log(`Successful login for user ${user.email}`);
        EventBus.dispatch("login");
        return history.push("/dashboard");
      },
      (error) => {
        console.log("error");
      }
    );
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Button
          id="closeButton"
          variant="outline-secondary"
          onClick={props.onHide}
          style={{ float: "right" }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            style={{ color: "#b8cd48", alignItems: "center" }}
          />
        </Button>
        <h4
          id="subHeading1"
          style={{
            paddingTop: "30px",
            paddingBottom: "25px",
            fontWeight: "300",
          }}
        >
          Welcome back, friend!
        </h4>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <FormControl
              type="text"
              onChange={(e) => setField("email", e.target.value)}
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginTop: "15px" }}>Password</Form.Label>
            <FormControl
              style={{ marginBottom: "20px" }}
              onChange={(e) => setField("password", e.target.value)}
              required
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2" style={{ paddingBottom: "10px" }}>
            <Button
              variant="dark"
              id="button1"
              onClick={(e) => handleSubmit(e)}
            >
              Log in
            </Button>
          </div>
        </Form>
        {/* <div className="d-grid gap-2">
          <Login register={false} />
        </div> */}
      </Modal.Body>
    </Modal>
  );
}


