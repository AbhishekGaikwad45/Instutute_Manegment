import React, { useEffect, useState } from "react";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    activeBatches: 0,
    newAdmissions: 0,
    todaysEnquiries: 0,
    pendingFeesCount: 0,
    pendingFeesAmount: 0,
    inactiveStudents: 0,
    activeAttendanceStudents: 0,
  });

  const loadStats = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#eef3ff", minHeight: "100vh" }}>
      <h2 style={{ fontWeight: "bold", color: "#003366", marginBottom: "20px" }}>
        Counselor Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Row 1 */}
        <Card title="Total Students" value={stats.totalStudents + "+"} />
        <Card title="Total Faculty" value={stats.totalFaculty + "+"} />
        <Card title="Active Batches" value={stats.activeBatches + "+"} />
        <Card title="New Admissions (This Month)" value={stats.newAdmissions} />

        {/* Row 2 */}
        <Card title="Today's Enquiries" value={stats.todaysEnquiries} />
        <Card title="Pending Fees (Students)" value={stats.pendingFeesCount} />
        <Card title="Pending Fees Amount" value={`₹ ${stats.pendingFeesAmount}`} />
        <Card title="Inactive Students" value={stats.inactiveStudents} />

        {/* Row 3 */}
        <Card title="Active Students (Attendance)" value={stats.activeAttendanceStudents} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h4 style={{ fontWeight: "bold", color: "#003366", marginBottom: "10px" }}>
        {title}
      </h4>
      <p style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>
        {value}
      </p>
    </div>
  );
}
