// src/pages/UserPage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";

const UserPage = () => {
  const [userName, setUserName] = useState("");
  const [totalBookings, setTotalBookings] = useState(0);
  const [latestBookingDate, setLatestBookingDate] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "Guest");

      // 🔹 Fetch user booking stats
      axios.get(`https://hotel-backend-production-8070.up.railway.app/api/bookings/user-booking-stats/${user.email}`)
        .then((res) => {
          setTotalBookings(res.data.totalBookings);
          if (res.data.latestBookingDate) {
            const dateObj = new Date(res.data.latestBookingDate);
            const formattedDate = dateObj.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            });
            setLatestBookingDate(formattedDate);
          } else {
            setLatestBookingDate("No bookings yet");
          }
        })
        .catch((err) => {
          console.error("Error fetching booking stats:", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="index-page">
      <Navbar />
      <div className="user-page">
        <div className="user-card">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1>Welcome back, <span className="highlight">{userName}</span> 👋</h1>
            <p className="subtitle">Your journey to comfort and luxury starts here.</p>
          </div>

          {/* User Info Boxes */}
          <div className="user-info">
            <div className="info-box">
              <h4>Membership</h4>
              <p>🌟 Premium Member</p>
            </div>
            <div className="info-box">
              <h4>Last Booking</h4>
              <p>📅 {latestBookingDate || "N/A"}</p>
            </div>
            <div className="info-box">
              <h4>Total Bookings</h4>
              <p>🏨 {totalBookings} {totalBookings === 1 ? "stay" : "stays"}</p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="tips-box">
            <h3>💡 Booking Tip</h3>
            <p>Book at least 5 days in advance to get exclusive discounts and better room availability.</p>
          </div>

          <div className="tips-box">
            <h3>💡 Booking Tip</h3>
            <p>Book at least 5 days in advance to get exclusive discounts and better room availability.</p>
          </div>

          {/* Action Buttons */}
          <div className="user-actions">
            <button className="primary-btn" onClick={() => navigate("/rooms")}>🔍 View Rooms</button>
            <button className="primary-btn" onClick={() => navigate("/app")}>📅 Book a Room</button>
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
