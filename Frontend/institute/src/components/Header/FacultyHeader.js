import React from "react";

export default function FacultyHeader({ faculty, onLogout }) {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        background: "#2563eb",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <h4 className="m-0">Faculty Dashboard</h4>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h5 className="m-0">
          Welcome, <b>{faculty?.name}</b>
        </h5>

        <button
          onClick={onLogout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
