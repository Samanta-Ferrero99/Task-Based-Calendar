// Import dependencies
import React from "react";
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';

// Import components
import ProjectSidePanel from "../components/projectSidePanel";
import TaskSearch from "../components/taskSearch";
import DashboardCard from "../components/dashboardCard";
import DashboardCalendar from "../components/calendar";

// The user's dashboard page -> overview of all tasks/projects
export default function CalendarPage() {

  const { user } = useSelector((state) => state.user);

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
