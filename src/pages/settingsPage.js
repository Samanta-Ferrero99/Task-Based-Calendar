import React from "react";
import { Container, Row, Col, Dropdown, ToggleButton } from "react-bootstrap";

/**
 * Landing page for the application.
 */
export default function SettingsPage() {
  // Styles
  const settingPage = {
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
    fontStyle: "italic",
  };

  const subHookCentered = {
    fontSize: "1.2em",
    fontWeight: "300",
    maxWidth: "490px",
    minWidth: "380px",
    marginTop: "100px",
    textAlign: "center",
    fontStyle: "italic",
  };

  const darkmode = {
    backgroundColor: "#91a434",
    display: "inline",
  };

  const dropdown = {
    display: "inline",
    marginRight: "20px",
  };

  // dark green: #91a434
  // light green: #b8cd48

  // End of styles

  return (
    <Container className="settingPage" style={settingPage}>
      <Row>
        <Col className="rightPane" md="6" style={rightPane}>
          <h1 className="hook" style={hook}>
            Settings
          </h1>
          <h3 className="subHook" style={subHook}>
            Personalization:
          </h3>
          <Dropdown style={dropdown}>
            <Dropdown.Toggle variant="success" id="backgroundColor">
              Background Color
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Blue</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Green</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <ToggleButton
            className="darkmode"
            id="darkmode"
            type="checkbox"
            variant="outline-success"
            value="1"
            style={darkmode}
          >
             DarkMode
          </ToggleButton>
          <h3 className="subHook" style={subHook}>
             Notifications:
          </h3>
          <ToggleButton
            className="notifications"
            id="notifications"
            type="checkbox"
            variant="outline-success"
            value="1"
            style={darkmode}
          >
            Notifications
          </ToggleButton>

          <h3 className="subHook" style={subHook}>
            Event Settings:
          </h3>
          <Dropdown style={dropdown}>
            <Dropdown.Toggle variant="success" id="eventColor">
              Event Default Color
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Red</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Blue</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Green</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={dropdown}>
            <Dropdown.Toggle variant="success" id="eventColor">
              Event Default Duration
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">15 minutes</Dropdown.Item>
              <Dropdown.Item href="#/action-2">30 minutes</Dropdown.Item>
              <Dropdown.Item href="#/action-3">1 hour</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h3 className="subHookCentered" style={subHookCentered}>
            Help
          </h3>
        </Col>
      </Row>
    </Container>
  );
}
