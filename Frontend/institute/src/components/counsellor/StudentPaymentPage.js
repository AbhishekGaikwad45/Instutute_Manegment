import React, { useEffect, useState } from "react";

export default function StudentPaymentPage({ studentId }) {
  const [studentData, setStudentData] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Load student details and computed fees from backend
  const loadStudent = async () => {
    if (!studentId) {
      console.warn("StudentPaymentPage: missing studentId prop");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/student/get/${studentId}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("GET /api/student/get error:", res.status, text);
        alert(`Failed to load student: ${res.status} ${text}`);
        return;
      }

      const data = await res.json();
      // Accept either:
      // { student: {...}, totalPaid: 123, pending: 456 }
      // OR direct student object with computed fields attached
      // OR { student: {...}, payments: [...] }
      let normalized = {
        student: null,
        totalPaid: 0,
        pending: 0
      };

      if (data === null) {
        alert("Server returned null student");
        return;
      }

      // If backend returns wrapper { student: ..., totalPaid, pending }
      if (data.student) {
        normalized.student = data.student;
        normalized.totalPaid = Number(data.totalPaid ?? 0);
        normalized.pending = Number(data.pending ?? 0);
      } else if (data.id || data.studentId) {
        // backend returned student directly
        normalized.student = data;
        // if backend included computed fields on root
        normalized.totalPaid = Number(data.totalPaid ?? 0) || Number(data.downPayment ?? 0);
        // pending if provided
        normalized.pending = Number(data.pending ?? (Number(data.totalFees ?? 0) - (Number(data.downPayment ?? 0) + 0)));
      } else {
        // fallback - keep raw data
        normalized.student = data;
      }

      setStudentData(normalized);
    } catch (err) {
      console.error("Error loading student:", err);
      alert("Error loading student. See console for details.");
    }
  };

  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  // Add payment
  const addPayment = async () => {
    if (!amount || Number(amount) <= 0) {
      return alert("Enter a valid amount greater than 0");
    }
    if (!studentData || !studentData.student) {
      return alert("Student not loaded");
    }

    // Determine student id (accept either id or student.id)
    const sid = studentData.student.id ?? studentData.studentId;
    if (!sid) {
      return alert("Cannot determine student ID");
    }

    setLoading(true);
    try {
      const payload = {
        studentId: Number(sid),
        amount: Number(amount),
        status: "PAID"
      };

      const res = await fetch("http://localhost:8080/api/payments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("POST /api/payments/add failed:", res.status, text);
        alert(`Payment failed: ${res.status} ${text}`);
        setLoading(false);
        return;
      }

      const saved = await res.json().catch(() => null);
      alert("Payment added successfully!");
      setAmount("");
      await loadStudent(); // refresh totals
    } catch (err) {
      console.error("Error adding payment:", err);
      alert("Server error while adding payment. See console.");
    } finally {
      setLoading(false);
    }
  };

  if (!studentData) return <p>Loading student...</p>;

  const stud = studentData.student || {};
  const totalFees = Number(stud.totalFees ?? 0);
  const downPayment = Number(stud.downPayment ?? 0);
  // If backend provides totalPaid/pending compute accordingly
  const totalPaid = Number(studentData.totalPaid ?? (downPayment + 0));
  const pending = Number(studentData.pending ?? (totalFees - totalPaid));

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ color: "#003366", marginBottom: "20px", fontWeight: "bold" }}>
        Student Payment
      </h2>

      {/* STUDENT INFO */}
      <div style={boxStyle}>
        <p><strong>Name:</strong> {stud.name ?? "—"}</p>
        <p><strong>Student ID:</strong> {stud.studentId ?? stud.id ?? "—"}</p>
        <p><strong>Total Fees:</strong> ₹ {totalFees.toLocaleString()}</p>
        <p><strong>Already Paid (including downpayment):</strong> ₹ {totalPaid.toLocaleString()}</p>
        <p><strong>Pending Fees:</strong> ₹ {pending.toLocaleString()}</p>
      </div>

      {/* PAYMENT FORM */}
      <div style={boxStyle}>
        <h4>Add New Payment</h4>

        <input
          type="number"
          placeholder="Enter Amount"
          className="form-control mb-3"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <button
          className="btn btn-primary w-100"
          onClick={addPayment}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Payment"}
        </button>
      </div>
    </div>
  );
}

// STYLES
const boxStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};
