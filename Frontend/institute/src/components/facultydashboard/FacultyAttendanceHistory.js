import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FacultyAttendanceHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const faculty = user?.data;

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [students, setStudents] = useState([]);

  // NEW FILTER STATES
  const [searchStudent, setSearchStudent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadBatches();
  }, []);

  // LOAD FACULTY BATCHES
  async function loadBatches() {
    try {
      const res = await fetch(`http://localhost:8080/api/batch/by-faculty/${faculty.id}`);
      const data = await res.json();
      setBatches(data);
    } catch {
      toast.error("Failed to load batches!");
    }
  }

  // WHEN A BATCH IS SELECTED
  async function selectBatch(batch) {
    setSelectedBatch(batch);

    loadAttendance(batch.batchCode);
    loadStudents(batch.batchCode);
  }

  // LOAD ALL ATTENDANCE HISTORY
  async function loadAttendance(batchCode) {
    try {
      const res = await fetch(`http://localhost:8080/api/attendance/batch/${batchCode}/all`);
      const data = await res.json();

      setRecords(data);
      setFilteredRecords(data); // default display
    } catch {
      toast.error("Failed to load attendance!");
    }
  }

  // LOAD STUDENTS FOR NAME + ID SEARCH
  async function loadStudents(batchCode) {
    try {
      const res = await fetch(`http://localhost:8080/api/student/by-batch/${batchCode}`);
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to load students!");
    }
  }

  // APPLY FILTERS (Auto-apply while typing)
  function applyFilters(studentValue = searchStudent, start = startDate, end = endDate) {
    let list = [...records];

    // STUDENT SEARCH (Matches ID OR Name)
    if (studentValue.trim() !== "") {
      const val = studentValue.toLowerCase();

      list = list.filter((rec) => {
        const stu = students.find((s) => s.studentId === rec.studentId);
        return (
          rec.studentId.toLowerCase().includes(val) ||
          stu?.name?.toLowerCase().includes(val)
        );
      });
    }

    // DATE RANGE FILTER
    if (start !== "" && end !== "") {
      list = list.filter((rec) => rec.date >= start && rec.date <= end);
    }

    setFilteredRecords(list);
  }

  // RESET FILTERS
  function resetFilters() {
    setSearchStudent("");
    setStartDate("");
    setEndDate("");
    setFilteredRecords(records);
  }

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT BATCH LIST */}
        <div className="col-md-3">
          <h5>Your Batches</h5>

          {batches.map((b) => (
            <div
              key={b.batchCode}
              className="card p-2 mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => selectBatch(b)}
            >
              <b>{b.batchCode}</b>
              <p>{b.batchName}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-9">
          {!selectedBatch && <h4>Select a batch to view attendance history…</h4>}

          {selectedBatch && (
            <>
              <h3>{selectedBatch.batchCode} — Attendance History</h3>

              {/* FILTER SECTION */}
              <div className="card p-3 mt-3">
                <h5>Filters</h5>

                <div className="row">

                  {/* LIVE SEARCH */}
                  <div className="col-md-4">
                    <label>Search Student (ID or Name)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type to search..."
                      value={searchStudent}
                      onChange={(e) => {
                        setSearchStudent(e.target.value);
                        applyFilters(e.target.value, startDate, endDate);
                      }}
                    />
                  </div>

                  {/* START DATE */}
                  <div className="col-md-4">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        applyFilters(searchStudent, e.target.value, endDate);
                      }}
                    />
                  </div>

                  {/* END DATE */}
                  <div className="col-md-4">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        applyFilters(searchStudent, startDate, e.target.value);
                      }}
                    />
                  </div>

                </div>

                {/* RESET BUTTON */}
                <button className="btn btn-secondary mt-3" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>

              {/* ATTENDANCE HISTORY LIST */}
              <div className="card p-3 mt-3">
                <h5>Attendance Records</h5>

                {filteredRecords.length === 0 && (
                  <p className="text-muted">No records found</p>
                )}

                {filteredRecords.map((rec) => {
                  const stu = students.find((s) => s.studentId === rec.studentId);

                  return (
                    <div key={rec.id} className="border p-2 mb-2">
                      <b>{rec.date}</b> — {rec.studentId} —{" "}
                      <span className="text-info">{stu?.name}</span> —{" "}
                      <span
                        className={
                          rec.status === "PRESENT"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {rec.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
