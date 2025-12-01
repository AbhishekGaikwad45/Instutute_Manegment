import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FacultyAttendance({ faculty }) {
  const batchCode = localStorage.getItem("selectedBatch");

  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [markDate, setMarkDate] = useState("");

  useEffect(() => {
    if (!batchCode) return;
    loadStudents();
  }, [batchCode]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/batch/${batchCode}/students`);
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setStudents(arr);

      // Default PRESENT
      const temp = {};
      arr.forEach((s) => (temp[s.studentId] = "PRESENT"));
      setStatusMap(temp);

      // IMPORTANT FIX: Set today's date automatically
      const today = new Date().toISOString().slice(0, 10);
      setMarkDate(today);

    } catch (err) {
      console.error("Failed to load students", err);
      setStudents([]);
      setStatusMap({});
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: prev[id] === "PRESENT" ? "ABSENT" : "PRESENT",
    }));
  };

  const saveAttendance = async () => {
    if (!batchCode) {
      toast.error("No batch selected.");
      return;
    }

    if (!markDate) {
      toast.error("Please select date before saving attendance.");
      return;
    }

    const payload = {
      batchCode,
      facultyId: faculty.id,
      facultyCode: faculty.facultyCode,
      date: markDate,
      records: Object.keys(statusMap).map((id) => ({
        studentId: id,
        status: statusMap[id],
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Attendance saved successfully!");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to save attendance.");
      }
    } catch (err) {
      console.error("saveAttendance error", err);
      toast.error("Server error while saving attendance.");
    }
  };

  if (!batchCode) {
    return (
      <div className="container mt-4">
        <p className="text-warning">No batch selected. Go to Dashboard and select a batch.</p>
      </div>
    );
  }

  if (loading) return <div className="container mt-4">Loading students...</div>;

  return (
    <div className="container mt-4">
      <h3>Mark Attendance — {batchCode}</h3>

      <div className="card p-3 mt-3">
        <label className="fw-semibold">Select Date</label>
        <input
          type="date"
          className="form-control w-25 mb-3"
          value={markDate}
          onChange={(e) => setMarkDate(e.target.value)}
        />

        {students.length === 0 && <p className="text-muted">No students found for this batch.</p>}

        {students.map((s) => (
          <div
            key={s.studentId}
            className="d-flex justify-content-between align-items-center bg-white p-3 shadow-sm rounded mb-2"
            style={{ maxWidth: "900px" }}
          >
            <div>
              <b>{s.name}</b>
              <div className="text-muted small">{s.studentId}</div>
            </div>

            <button
              className={`btn ${statusMap[s.studentId] === "PRESENT" ? "btn-success" : "btn-danger"}`}
              onClick={() => toggle(s.studentId)}
            >
              {statusMap[s.studentId]}
            </button>
          </div>
        ))}

        {students.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-primary" onClick={saveAttendance}>
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
