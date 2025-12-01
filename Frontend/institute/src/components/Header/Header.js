export default function Header() {
  
  // GET COUNSELOR FROM LOCAL STORAGE (2 cases)
  const stored1 = JSON.parse(localStorage.getItem("counselor"));
  const stored2 = JSON.parse(localStorage.getItem("user"))?.data;

  const counselor = stored1 || stored2;

  const handleLogout = () => {
    localStorage.removeItem("counselor");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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
      }}
    >
      {/* CHANGE TITLE */}
      <h4 className="m-0">Counselor Dashboard</h4>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h5 className="m-0">
          Welcome, <b>{counselor?.fullName || counselor?.name || counselor?.email}</b>
        </h5>

        <button
          onClick={handleLogout}
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
