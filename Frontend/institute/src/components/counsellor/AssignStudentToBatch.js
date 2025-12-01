import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AssignStudent() {
  const [studentId, setStudentId] = useState("");
  const [batchCode, setBatchCode] = useState("");

  const assign = async () => {
    if (!studentId || !batchCode) {
      toast.error("Please enter both Student ID and Batch Code!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/batch/assign-student/${batchCode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Student Assigned Successfully!");
        setStudentId("");
        setBatchCode("");
      } else {
        toast.error(data.error || "Failed to assign student!");
      }
    } catch (err) {
      toast.error("Server Error! Try again later.");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <h3 className="text-center fw-bold mb-3">
            Assign Student to Batch
          </h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Student ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Batch Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Batch Code"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={assign}>
            Assign Student
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
