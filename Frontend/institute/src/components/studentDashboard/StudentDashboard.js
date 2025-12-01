import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stored = localStorage.getItem("student");
  const student = stored ? JSON.parse(stored) : null;

  const [activePage, setActivePage] = useState("dashboard");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (student && student.studentId) loadBatches(student.studentId);
  }, []);

  const loadBatches = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/student/${id}/batches`
      );
      const data = await res.json();
      setBatches(data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!student)
    return <h2 style={{ padding: 40, color: "red" }}>Unauthorized Access</h2>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ========================= HEADER ========================= */}
      <div
        style={{
          background: "#fff",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h3>Student Dashboard</h3>

        <div>
          <span style={{ marginRight: 20 }}>
            Welcome, <b>{student.name}</b>
          </span>

          <button
            onClick={logout}
            style={{
              padding: "5px 15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ========================= BODY ========================= */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* =================##### SIDEBAR #####================= */}
        <div
          style={{
            width: "220px",
            background: "#1E1E2F",
            color: "#fff",
            padding: "20px",
          }}
        >
          <h4 style={{ color: "#4CAF50" }}>Menu</h4>

          <div
            style={{ marginTop: 20, cursor: "pointer" }}
            onClick={() => setActivePage("dashboard")}
          >
            📊 Dashboard
          </div>

          <div
            style={{ marginTop: 15, cursor: "pointer" }}
            onClick={() => setActivePage("batches")}
          >
            🎓 My Batches
          </div>

          <div
            style={{ marginTop: 15, cursor: "pointer" }}
            onClick={() => setActivePage("materials")}
          >
            📚 Study Materials
          </div>

          <div
            style={{ marginTop: 15, cursor: "pointer" }}
            onClick={() => setActivePage("profile")}
          >
            👤 Profile
          </div>
        </div>

        {/* =================##### MAIN CONTENT #####================= */}
        <div style={{ flexGrow: 1, padding: "25px", background: "#f5f5f5" }}>
          {/* ================= DASHBOARD ===================== */}
          {activePage === "dashboard" && (
            <>
              <h2>Welcome, {student.name}</h2>
              <p>Student ID: <b>{student.studentId}</b></p>

              {/* DASHBOARD CARDS */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  margin: "20px 0",
                  flexWrap: "wrap",
                }}
              >
                {/* Total Courses */}
                <div
                  style={{
                    width: "250px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h4>Total Courses</h4>
                  <h2 style={{ color: "#4CAF50" }}>{batches.length}</h2>
                </div>

                {/* Total Score */}
                <div
                  style={{
                    width: "250px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h4>Total Score</h4>
                  <h2 style={{ color: "#2196F3" }}>0</h2>
                </div>

                {/* Total Attendance */}
                <div
                  style={{
                    width: "250px",
                    padding: "20px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h4>Total Attendance</h4>
                  <h2 style={{ color: "#FF9800" }}>
                    {batches.length > 0 ? "80%" : "0%"}
                  </h2>
                </div>
              </div>

              <hr />
              <h3>Your Batches</h3>

              {batches.length === 0 && <p>No batches assigned yet.</p>}

              {batches.map((item, index) => {
                const batch = item.batch;
                const faculty = item.faculty;

                return (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ddd",
                      padding: 12,
                      marginBottom: 10,
                      borderRadius: 8,
                      background: "white",
                    }}
                  >
                    <p>
                      <b>
                        {batch.batchName} ({batch.batchCode})
                      </b>
                    </p>

                    <p>Course: {batch.courseName}</p>
                    <p>Timing: {batch.batchTiming}</p>
                    <p>Start: {batch.startDate}</p>

                    <hr />

                    <p>
                      <b>Faculty:</b> {faculty ? faculty.name : "Not assigned"}
                    </p>

                    {faculty && (
                      <>
                        <p>Email: {faculty.email}</p>
                        <p>Mobile: {faculty.mobile}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* ================= MY BATCHES ===================== */}
          {activePage === "batches" && (
            <>
              <h2>My Batches</h2>

              {batches.length === 0 && <p>No batches assigned.</p>}

              {batches.map((item, index) => {
                const batch = item.batch;
                const faculty = item.faculty;

                return (
                  <div
                    key={index}
                    style={{
                      padding: 12,
                      marginBottom: 10,
                      background: "white",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  >
                    <p>
                      <b>
                        {batch.batchName} ({batch.batchCode})
                      </b>
                    </p>
                    <p>Timing: {batch.batchTiming}</p>
                    <p>Course: {batch.courseName}</p>

                    <p>
                      Faculty:{" "}
                      <b>{faculty ? faculty.name : "Not Assigned"}</b>
                    </p>
                  </div>
                );
              })}
            </>
          )}

          {/* ================= STUDY MATERIALS ===================== */}
          {activePage === "materials" && (
            <>
              <h2>Study Materials</h2>
              <p>No study materials uploaded yet.</p>
            </>
          )}

          {/* ================= PROFILE ===================== */}
          {activePage === "profile" && (
            <>
              <h2>Your Profile</h2>

              <div style={{ background: "white", padding: 20, width: 350 }}>
                <p><b>Name:</b> {student.name}</p>
                <p><b>Email:</b> {student.email}</p>
                <p><b>Mobile:</b> {student.mobile}</p>
                <p><b>Address:</b> {student.addressLine1}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
