import React, { useState } from "react";
import FacultyHeader from "../Header/FacultyHeader";
import FacultySidebar from "../Sidebar/FacultySidebar";

import FacultyHome from "./FacultyHome";
import FacultyAttendance from "./FacultyAttendance";
import FacultyHistory from "./FacultyHistory";

export default function FacultyLayout() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <FacultyHome setPage={setPage} />;

      case "attendance":
        return <FacultyAttendance />;

      case "history":
        return <FacultyHistory />;

      default:
        return <FacultyHome setPage={setPage} />;
    }
  };

  return (
    <>
      <FacultyHeader />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-2 bg-dark text-white vh-100 position-fixed"
            style={{ top: "60px" }}
          >
            <FacultySidebar activePage={page} setPage={setPage} />
          </div>

          {/* Main Content */}
          <div className="col-10 offset-2 mt-5 pt-4">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}
