import React from "react";

export default function FacultySidebar({ activePage, setPage }) {
  return (
    <div className="p-3">
      

      <div className="list-group">

        <button
          className={
            "list-group-item list-group-item-action bg-transparent text-white border-0 " +
            (activePage === "home" ? "active bg-primary text-white fw-bold" : "")
          }
          onClick={() => setPage("home")}
        >
          Dashboard
        </button>

        <button
          className={
            "list-group-item list-group-item-action bg-transparent text-white border-0 " +
            (activePage === "attendance" ? "active bg-primary text-white fw-bold" : "")
          }
          onClick={() => setPage("attendance")}
        >
          Mark Attendance
        </button>

        <button
          className={
            "list-group-item list-group-item-action bg-transparent text-white border-0 " +
            (activePage === "history" ? "active bg-primary text-white fw-bold" : "")
          }
          onClick={() => setPage("history")}
        >
          Attendance History
        </button>

      </div>
    </div>
  );
}
