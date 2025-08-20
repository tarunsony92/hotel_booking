// src/IndexPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./IndexPage.css";
import Navbar from "./components/Navbar";

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="index-page">
      <Navbar />
    <div className="index-container">
      <h1>🏨 Welcome to Hotel Room Reservation System</h1>
      <p>Smart Booking | Fast Allocation | Minimal Travel</p>
      <button onClick={() => navigate("/app")}>Enter Booking App</button>
    </div>
    </div>
  );
};

export default IndexPage;
