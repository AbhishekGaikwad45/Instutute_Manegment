import React, { useEffect, useState } from "react";

export default function FacultyHistory({ faculty }) {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [history, setHistory] = useState({});
  const [allRecords, setAllRecords] = useState([]);

  // Date filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Load batches assigned to this faculty
  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/batch/by-faculty/${faculty.id}`);
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setBatches(arr);
    } catch (err) {
      console.error("Failed to load batches", err);
      setBatches([]);
    }
  };

  // Load history for selected batch
  const selectBatch = (batch) => {
    setSelectedBatch(batch);
    loadHistory(batch.batchCode);
  };

  const loadHistory = async (batchCode) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/attendance/batch/${batchCode}/all`
      );
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];

      setAllRecords(arr);
      groupRecords(arr);
    } catch (err) {
      console.error("Failed to load history", err);
      setHistory({});
    }
  };

  // Group records by date
  const groupRecords = (records) => {
    const grouped = {};

    records.forEach((rec) => {
      if (!grouped[rec.date]) grouped[rec.date] = [];
      grouped[rec.date].push(rec);
    });

    const sorted = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

    const finalObj = {};
    sorted.forEach((d) => (finalObj[d] = grouped[d]));

    setHistory(finalObj);
  };

  // Date Range Filter
  const filterByDateRange = () => {
    if (!startDate || !endDate) {
      alert("Please select BOTH start and end date");
      return;
    }

    const filtered = allRecords.filter((r) => r.date >= startDate && r.date <= endDate);
    groupRecords(filtered);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    groupRecords(allRecords);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* LEFT SIDE — BATCH LIST */}
        <div className="col-3">
          <h5 className="fw-bold">Your Batches</h5>

          {batches.map((b) => (
            <div
              key={b.batchCode}
              className="card p-2 mb-2 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => selectBatch(b)}
            >
              <b>{b.batchCode}</b>
              <div className="text-muted small">{b.batchName}</div>
            </div>
          ))}

          {batches.length === 0 && (
            <p className="text-muted mt-2">No batches assigned.</p>
          )}
        </div>

        {/* RIGHT SIDE — HISTORY LIST */}
        <div className="col-9">
          {!selectedBatch && (
            <h4 className="text-muted">Select a batch to view history</h4>
          )}

          {selectedBatch && (
            <>
              <h3>
                Attendance History — <span className="text-primary">{selectedBatch.batchCode}</span>
              </h3>

              {/* DATE FILTER UI */}
              <div className="card p-3 mb-4 shadow-sm" style={{ maxWidth: "700px" }}>
                <h5 className="fw-bold">Filter Records by Date Range</h5>

                <div className="row mt-2">
                  <div className="col-md-5">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-5">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={filterByDateRange}>
                      Apply
                    </button>
                  </div>

                  <div className="col-md-12 mt-2">
                    <button className="btn btn-secondary w-100" onClick={resetFilter}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* ATTENDANCE RECORDS */}
              {Object.keys(history).length === 0 && (
                <p className="text-muted mt-3">No attendance records found.</p>
              )}

              {Object.keys(history).map((date) => (
                <div key={date} className="mt-4">
                  <h5 className="fw-bold">{date}</h5>

                  {history[date].map((rec) => (
                    <div
                      key={rec.id}
                      className="card p-2 mt-2 shadow-sm"
                      style={{ maxWidth: "900px" }}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <b>{rec.studentId}</b> — {rec.studentName || ""}
                        </div>

                        <span
                          className={`badge ${
                            rec.status === "PRESENT" ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
