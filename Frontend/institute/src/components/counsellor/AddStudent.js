import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddStudent() {
  const emptyForm = {
    name: "",
    fatherName: "",
    birthDate: "",
    mobile: "",
    parentContact: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    nativePlace: "",
    state: "",
    qualification: "",
    passOutYear: "",
    anyOtherCertification: "",
    courseEnrolledFor: "",
    admissionDate: "",
    totalFees: "",
    downPayment: "",
  };

  const [form, setForm] = useState(emptyForm);

  // STATES of India
  const statesList = [
    "Maharashtra",
    "Karnataka",
    "Gujarat",
    "Madhya Pradesh",
    "Uttar Pradesh",
    "Rajasthan",
    "Delhi",
    "Haryana",
    "Punjab",
    "Telangana",
    "Tamil Nadu",
    "West Bengal",
    "Bihar",
    "Odisha",
    "Kerala",
  ];

  // Courses
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/course/all");
      const data = await res.json();
      const finalCourses = Array.isArray(data) ? data : [];
      setCourseList(finalCourses);
    } catch (error) {
      console.error("Course load error:", error);
      alert("Failed to load courses!");
      setCourseList([]);
    }
  };

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE STUDENT
  const saveStudent = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add student!");
        return;
      }

      toast.success("Student Added! ID: " + data.studentId);
      setForm(emptyForm);

    } catch (error) {
      alert("Server Error! Check backend.");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow p-4" style={{ maxWidth: "900px", margin: "auto" }}>
          <h2 className="text-center fw-bold mb-4">Add Student</h2>

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label fw-semibold">NAME</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handle}
            />
          </div>

          {/* FATHER NAME */}
          <div className="mb-3">
            <label className="form-label fw-semibold">FATHER NAME</label>
            <input
              type="text"
              name="fatherName"
              className="form-control"
              value={form.fatherName}
              onChange={handle}
            />
          </div>

          {/* BIRTHDATE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">BIRTH DATE</label>
            <input
              type="date"
              name="birthDate"
              className="form-control"
              value={form.birthDate}
              onChange={handle}
            />
          </div>

          {/* MOBILE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">MOBILE</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              value={form.mobile}
              onChange={handle}
            />
          </div>

          {/* PARENT CONTACT */}
          <div className="mb-3">
            <label className="form-label fw-semibold">PARENT CONTACT</label>
            <input
              type="text"
              name="parentContact"
              className="form-control"
              value={form.parentContact}
              onChange={handle}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-semibold">EMAIL</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handle}
            />
          </div>

          {/* ADDRESS LINE 1 */}
          <div className="mb-3">
            <label className="form-label fw-semibold">ADDRESS LINE 1</label>
            <input
              type="text"
              name="addressLine1"
              className="form-control"
              value={form.addressLine1}
              onChange={handle}
            />
          </div>

          {/* ADDRESS LINE 2 */}
          <div className="mb-3">
            <label className="form-label fw-semibold">ADDRESS LINE 2</label>
            <input
              type="text"
              name="addressLine2"
              className="form-control"
              value={form.addressLine2}
              onChange={handle}
            />
          </div>

          {/* NATIVE PLACE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">NATIVE PLACE</label>
            <input
              type="text"
              name="nativePlace"
              className="form-control"
              value={form.nativePlace}
              onChange={handle}
            />
          </div>

          {/* STATE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">STATE</label>
            <select
              name="state"
              className="form-select"
              value={form.state}
              onChange={handle}
            >
              <option value="">Select State</option>
              {statesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* QUALIFICATION */}
          <div className="mb-3">
            <label className="form-label fw-semibold">QUALIFICATION</label>
            <input
              type="text"
              name="qualification"
              className="form-control"
              value={form.qualification}
              onChange={handle}
            />
          </div>

          {/* PASS OUT YEAR */}
          <div className="mb-3">
            <label className="form-label fw-semibold">PASS OUT YEAR</label>
            <input
              type="text"
              name="passOutYear"
              className="form-control"
              value={form.passOutYear}
              onChange={handle}
            />
          </div>

          {/* OTHER CERTIFICATION */}
          <div className="mb-3">
            <label className="form-label fw-semibold">ANY OTHER CERTIFICATION</label>
            <input
              type="text"
              name="anyOtherCertification"
              className="form-control"
              value={form.anyOtherCertification}
              onChange={handle}
            />
          </div>

          {/* COURSE DROPDOWN */}
          <div className="mb-3">
            <label className="form-label fw-semibold">COURSE ENROLLED FOR</label>
            <select
              name="courseEnrolledFor"
              className="form-select"
              value={form.courseEnrolledFor}
              onChange={handle}
            >
              <option value="">Select Course</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.courseName}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* ADMISSION DATE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">ADMISSION DATE</label>
            <input
              type="date"
              name="admissionDate"
              className="form-control"
              value={form.admissionDate}
              onChange={handle}
            />
          </div>

          {/* TOTAL FEES */}
          <div className="mb-3">
            <label className="form-label fw-semibold">TOTAL FEES</label>
            <input
              type="text"
              name="totalFees"
              className="form-control"
              value={form.totalFees}
              onChange={handle}
            />
          </div>

          {/* DOWN PAYMENT */}
          <div className="mb-3">
            <label className="form-label fw-semibold">DOWN PAYMENT</label>
            <input
              type="text"
              name="downPayment"
              className="form-control"
              value={form.downPayment}
              onChange={handle}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={saveStudent}>
            Add Student
          </button>
        </div>
      </div>
    </>
  );
}
