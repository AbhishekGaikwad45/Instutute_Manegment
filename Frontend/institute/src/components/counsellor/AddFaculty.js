import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddFaculty() {
  const emptyForm = {
    name: "",
    email: "",
    mobile: "",
    birthDate: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveFaculty = async () => {
    setLoading(true); // START LOADING

    try {
      const res = await fetch("http://localhost:8080/api/faculty/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();

      if (res.ok) {
        toast.success("Faculty added successfully!");
        setForm(emptyForm);
      } else {
        let errorMsg = "Failed to add faculty";

        try {
          const json = JSON.parse(text);
          errorMsg = json.error || errorMsg;
        } catch {
          errorMsg = text || errorMsg;
        }

      alert(errorMsg);
      }
    } catch (err) {
      alert("Server not responding!");
    }

    setLoading(false); // STOP LOADING
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "auto" }}>
        <h2 className="text-center fw-bold mb-4">Add Faculty</h2>

        {Object.keys(form).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label fw-semibold">{key.toUpperCase()}</label>
            <input
              type={key.includes("Date") ? "date" : "text"}
              name={key}
              className="form-control"
              value={form[key]}
              onChange={handle}
            />
          </div>
        ))}

        <button
          className="btn btn-primary w-100"
          onClick={saveFaculty}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Faculty"}
        </button>
      </div>
    </div>
  );
}
