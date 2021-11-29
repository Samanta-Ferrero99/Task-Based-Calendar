// Import dependencies
import React from "react";

// Import components
import DashboardCalendar from "../components/calendar";

// The user's dashboard page -> overview of all tasks/projects
export default function CalendarPage() {

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
