import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AssignFacultyToBatch() {
  const [facultyCode, setFacultyCode] = useState("");
  const [batchCode, setBatchCode] = useState("");

  const assignFaculty = async () => {
    if (!facultyCode || !batchCode) {
      toast.error("Please enter both Batch Code & Faculty Code!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/batch/assign-faculty",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ batchCode, facultyCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Faculty Assigned Successfully!");

        // Clear fields
        setBatchCode("");
        setFacultyCode("");
      } else {
        toast.error(data.error || "Failed to assign!");
      }
    } catch (err) {
      toast.error("Network Error! Try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h3 className="text-center mb-4 fw-bold text-primary">
            Assign Faculty to Batch
          </h3>

          {/* Batch Code */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Batch Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Batch Code (Ex: BATCH-101)"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
            />
          </div>

          {/* Faculty Code */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Faculty Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Faculty Code (Ex: FAC-12)"
              value={facultyCode}
              onChange={(e) => setFacultyCode(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 mt-3" onClick={assignFaculty}>
            Assign Faculty
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
