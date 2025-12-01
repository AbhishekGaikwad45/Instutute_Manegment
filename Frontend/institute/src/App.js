import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

// Counselor
import AddStudent from "./components/counsellor/AddStudent";
import AddFaculty from "./components/counsellor/AddFaculty";
import CreateBatch from "./components/counsellor/CreateBatch";
import AssignStudent from "./components/counsellor/AssignStudentToBatch";
import AssignFaculty from "./components/counsellor/AssignFacultyToBatch";
import CounselorDashboard from "./components/counsellor/CounselorDashboard";
import AddBatch from "./components/counsellor/AddBatch";
import AddCourse from "./components/counsellor/AddCourse";

// Faculty
import FacultyLayout from "./components/facultydashboard/FacultyLayout";
import FacultyHome from "./components/facultydashboard/FacultyHome";
import FacultyAttendance from "./components/facultydashboard/FacultyAttendance";
import FacultyHistory from "./components/facultydashboard/FacultyHistory";

import FacultyDashboard from "./components/facultydashboard/FacultyDashboard";
import FacultyAttendanceHistory from "./components/facultydashboard/FacultyAttendanceHistory";
import ShowFacultyDetails from "./components/facultydashboard/ShowFacultyDetails";

// Student
import StudentDashboard from "./components/studentDashboard/StudentDashboard";
import StudentAttendanceCalendar from "./components/studentDashboard/StudentAttendanceCalendar";
import HeaderHome from "./components/HomePage/HeaderHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<HeaderHome />} />
        <Route path="/signup" element={<Signup />} />

        {/* Counselor */}
        <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/assign-student" element={<AssignStudent />} />
        <Route path="/assign-faculty" element={<AssignFaculty />} />
        <Route path="/add-batch" element={<AddBatch />} />
        <Route path="/show-faculty-details" element={<ShowFacultyDetails />} />
        <Route path="/add-course" element={<AddCourse />} />

        {/* Legacy Faculty */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty-attendance" element={<FacultyAttendanceHistory />} />

        {/* Faculty New Layout */}
        <Route path="/faculty" element={<FacultyLayout />}>
          <Route index element={<FacultyHome />} />
          <Route path="home" element={<FacultyHome />} />
          <Route path="attendance" element={<FacultyAttendance />} />
          <Route path="history" element={<FacultyHistory />} />
        </Route>

        {/* Student */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-attendance" element={<StudentAttendanceCalendar />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ⭐ THIS IS VERY IMPORTANT — Toast popup will appear here */}
      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
  );
}

export default App;
