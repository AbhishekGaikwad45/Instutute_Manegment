import React, { useState } from "react";
import Login from "../login/Login";
// import Footer from ".";

export default function HeaderHome() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-2 text-white fixed-top shadow"
        style={{ backgroundColor: "#02284F" }}
      >
        <img
          src="/SPARK_Logo_White_orange-2048x332.png"
          alt="Spark Logo"
          style={{ height: "45px" }}
        />

        <button
          className="btn btn-warning fw-bold"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </div>

      {/* SPACE BELOW HEADER */}
      <div style={{ marginTop: "60px" }}></div>

      {/* ================= CONDITIONAL RENDER ================= */}

      {showLogin ? (
        // LOGIN PAGE SHOW
        <div className="container py-1">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger mb-3"
              onClick={() => setShowLogin(false)}
            >
              Close
            </button>
          </div>

          <Login />
        </div>
      ) : (
        // CAROUSEL SHOW
        <div
          id="mainSlider"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                className="d-block w-100"
                style={{ height: "90vh", objectFit: "cover" }}
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                className="d-block w-100"
                style={{ height: "90vh", objectFit: "cover" }}
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                className="d-block w-100"
                style={{ height: "90vh", objectFit: "cover" }}
              />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      )}

     
    </>
  );
}
