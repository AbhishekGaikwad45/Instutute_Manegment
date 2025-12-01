import React, { useEffect, useState } from "react";

export default function FacultyHome({ faculty, setPage }) {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    loadBatches();
  }, [faculty]);

  const loadBatches = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/batch/by-faculty/${faculty.id}`);
      if (!res.ok) {
        setBatches([]);
        return;
      }
      const data = await res.json();
      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load batches", err);
      setBatches([]);
    }
  };

  const openAttendance = (code) => {
    localStorage.setItem("selectedBatch", code);
    setPage("attendance");
    // NO toast here per your request
  };

  const openHistory = (code) => {
    localStorage.setItem("selectedBatch", code);
    setPage("history");
    // NO toast here per your request
  };

  return (
    <div className="container mt-3">
      <h3>Your Batches</h3>

      {batches.length === 0 && <p className="text-muted mt-3">No batches to display.</p>}

      {batches.map((b) => (
        <div
          className="p-3 bg-white shadow-sm rounded d-flex justify-content-between mt-3"
          key={b.batchCode}
          style={{ maxWidth: "900px" }}
        >
          <div>
            <b>{b.batchName}</b>
            <div className="small text-muted">{b.batchTiming}</div>
            <div className="small text-muted">Code: {b.batchCode}</div>
          </div>

          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => openAttendance(b.batchCode)}
            >
              Take Attendance
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => openHistory(b.batchCode)}
            >
              View History
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
