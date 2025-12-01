// FacultyDashboard.js
import React, { useState } from "react";

import FacultyHeader from "../Header/FacultyHeader";
import FacultySidebar from "../Sidebar/FacultySidebar";

import FacultyHome from "./FacultyHome";
import FacultyAttendance from "./FacultyAttendance";
import FacultyHistory from "./FacultyHistory";
import ShowFacultyDetails from "./ShowFacultyDetails";

export default function FacultyDashboard() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const faculty = user?.role === "faculty" ? user.data : null;

  const [page, setPage] = useState("home");

  if (!faculty) {
    return <h2 style={{ padding: 40, color: "red" }}>Unauthorized Access</h2>;
  }

  // -------- PAGE SWITCHER --------
  const renderPage = () => {
    switch (page) {
      case "home":
        return <FacultyHome faculty={faculty} setPage={setPage} />;

      case "attendance":
        return <FacultyAttendance faculty={faculty} />;

      case "history":
        return <FacultyHistory faculty={faculty} />;

      case "facultyDetail":
        return <ShowFacultyDetails />;

      default:
        return <FacultyHome faculty={faculty} setPage={setPage} />;
    }
  };

  return (
    <>
      {/* ---- TOP HEADER ---- */}
      <FacultyHeader faculty={faculty} />

      <div className="container-fluid">
        <div className="row">

          {/* ---- LEFT SIDEBAR ---- */}
          <div
            className="col-2 bg-dark text-white vh-100 position-fixed"
            style={{ top: "60px", padding: 0 }}
          >
            <FacultySidebar activePage={page} setPage={setPage} />
          </div>

          {/* ---- RIGHT SIDE MAIN CONTENT ---- */}
          <div className="col-10 offset-2 mt-5 pt-3">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}
