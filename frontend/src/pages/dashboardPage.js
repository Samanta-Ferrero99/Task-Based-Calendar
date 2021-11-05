// Import dependencies
import React from "react";
import { Row, Col } from "antd";
import {useHistory} from "react-router-dom";

// Import authentication services
import UserService from "../services/userService";
import AuthService from "../services/authService";
import EventBus from "../utils/eventBus";
// import AuthService from "../services/authService";

// Import components
import ProjectSidePanel from "../components/projectSidePanel";
import TaskSearch from "../components/taskSearch";
import DashboardCard from "../components/dashboardCard";
import DashboardCalendar from "../components/calendar";

// The user's dashboard page -> overview of all tasks/projects
export default function DashboardPage() {
  const history = useHistory();
  // // Get the current user & token
  // const user = AuthService.getCurrentUser();

  // // Content to display
  // const [content, setContent] = React.useState("");

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
    if (!AuthService.getCurrentUser() || AuthService.getCurrentUser().user === undefined) {
      history.push("/");
    }
  }, []);

  
  
  // Render the page
  return (
    <>
      {/* <ProjectSidePanel /> */}

      <div
        className="dashboard"
        id="dashboard"
        style={{ paddingLeft: "9vw", paddingTop: "5vh" }}
      >
        <Row style={{ paddingBottom: "20px" }}>
          <TaskSearch />
        </Row>
        <Row>
          <DashboardCard width="85vw" height="200px" color="#fafafa">
            <br />
            <h1 id="normalHeading1">good morning, username !</h1>
            <p id="subHeading2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum non nunc eu accumsan. Nullam sagittis vehicula leo, in
              commodo justo feugiat vel.
            </p>
          </DashboardCard>
        </Row>
        <br />
        <Row gutter={[24, 24]}>
          <Col span={11.5}>
            <DashboardCard width="41vw" height="400px" color="#fafafa">
              <br />
              <h1 id="normalHeading1">weekly progress</h1>
              <p id="subHeading2">Lorem ipsum dolor sit amet</p>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col span={5.5}>
                <DashboardCard width="20vw" height="180px" color="#fafafa">
                  <h1 id="normalHeading2">today</h1>
                  <p id="subHeading3">WIP STATIC DATA</p>
                </DashboardCard>
              </Col>
              <Col span={5.5}>
                <DashboardCard width="20vw" height="180px" color="#fafafa">
                  <h1 id="normalHeading2">tomorrow</h1>
                  <p id="subHeading3">WIP STATIC DATA</p>
                </DashboardCard>
              </Col>
            </Row>
            <br />
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <DashboardCard width="41vw" height="180px" color="#fafafa">
                  <h1 id="normalHeading2">deadlines approaching</h1>
                  <p id="subHeading3">WIP STATIC DATA</p>
                </DashboardCard>
              </Col>
            </Row>
          </Col>

          <Col span={8} />
          <Col span={8} />
          <Col span={8} />
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8} />
          <Col span={8} />
          <Col span={8} />
        </Row>
        {/* <Row>
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
        </Row> */}

        {/* <Row>
          <img
            src={loginImage}
            alt="Login"
            className="registerImage"
            id="loginImage"
          />
        </Row> */}
      </div>
    </>
  );
}
