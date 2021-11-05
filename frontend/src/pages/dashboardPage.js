// Import dependencies
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import authentication services
import UserService from "../services/userService";
import EventBus from "../utils/eventBus";
import AuthService from "../services/authService";

// Import components
import ProjectSidePanel from "../components/projectSidePanel";
import TaskSearch from "../components/taskSearch";
import DashboardCard from "../components/dashboardCard";

// The user's dashboard page -> overview of all tasks/projects
export default function DashboardPage() {

  // Get the current user & token
  const user = AuthService.getCurrentUser();

  // Content to display
  const [content, setContent] = React.useState("");

  // Fire on initial render -> check user's access token for authentication
  // Logout when token is expired
  React.useEffect(() => {
    UserService.verifyUserAuth().then(
      (response) => {
        console.log(response.data.message);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Error authenticating, logging out");
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  
  // Render the page
  return (
    <>
      <ProjectSidePanel />
      <TaskSearch/>
      <DashboardCard width="600px" height="400px" color="red">
        <h1>Test</h1>
      </DashboardCard>
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
              Learn the ins and outs of using chronicle with our new-user
              walkthrough
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
    </>
  );
}
