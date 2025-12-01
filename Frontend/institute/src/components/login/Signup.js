import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match!", {
        position: "top-right",
      });
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.text();

      if (res.ok) {
        toast.success(data || "Signup Successful!", {
          position: "top-right",
        });

        // Reset form
        setForm({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data || "Signup Failed!", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Server Error! Try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-enter Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button className="btn btn-success w-100" type="submit">
              Signup
            </button>
          </form>
        </div>
      </div>

      {/* Toast container (required) */}
      <ToastContainer />
    </>
  );
}
