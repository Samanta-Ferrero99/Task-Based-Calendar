// Import dependencies
import React from "react";
import { Row, Col } from "antd";

// Import authentication services
import UserService from "../services/userService";
import EventBus from "../utils/eventBus";
// import AuthService from "../services/authService";

// Import components
import ProjectSidePanel from "../components/projectSidePanel";
import TaskSearch from "../components/taskSearch";
import DashboardCard from "../components/dashboardCard";
import DashboardCalendar from "../components/calendar";

// The user's dashboard page -> overview of all tasks/projects
export default function CalendarPage() {
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
  }, []);

  // Render the page
  return (
    <>
      {/* <ProjectSidePanel /> */}

      <div
        className="calendar"
        id="calendar"
        style={{ paddingLeft: "8vw", paddingTop: "2vh", maxWidth: "85vw" }}
      >
        <h1 id="cooperHeading1" style={{ color: "#df7538" }}>
          calendar
        </h1>
        <DashboardCalendar />
      </div>
    </>
  );
}
