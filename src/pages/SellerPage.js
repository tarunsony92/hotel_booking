// src/pages/SellerPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./SellerPage.css";

const SellerPage = () => {
  const [sellerName, setSellerName] = useState("");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const seller = JSON.parse(localStorage.getItem("user"));
    if (seller) {
      setSellerName(seller.name);
    }
    axios
      .get("https://hotel-backend-production-8070.up.railway.app/api/bookings/all-bookings")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setBookings(sorted);
      })
      .catch((err) => console.error("Error loading bookings", err));
  }, []);

  return (
    <div className="seller-dashboard">
      <Navbar />

      <div className="dashboard-container">
        <h2 className="dashboard-title">
          🏨 Welcome back, <span>{sellerName}</span> 👑
        </h2>
        <p className="dashboard-subtitle">
          Manage your property efficiently and track your bookings in style.
        </p>

        {/* Info Cards */}
        <div className="info-grid">
          <div className="info-card">
            <h4>📦 Total Bookings</h4>
            <p>{bookings.length} reservations</p>
          </div>
          <div className="info-card">
            <h4>🚪 Rooms Managed</h4>
            <p>12 rooms</p>
          </div>
          <div className="info-card">
            <h4>💰 Earnings</h4>
            <p>₹{bookings.length * 500}</p>
          </div>
        </div>

        {/* Booking History */}
        <div className="table-card">
          <h3>📊 Recent Bookings</h3>
          {bookings.length === 0 ? (
            <p className="empty-text">No bookings yet.</p>
          ) : (
            <div className="table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>👤 Customer</th>
                    <th>📧 Email</th>
                    <th>📞 Phone</th>
                    <th>🛏️ Rooms</th>
                    <th>📅 Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((booking, index) => (
                    <tr key={booking.id}>
                      <td>{index + 1}</td>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.phone}</td>
                      <td>{booking.rooms}</td>
                      <td>{new Date(booking.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/addroom")}
          >
            ➕ Add New Room
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/rooms")}
          >
            🛏️ View Rooms
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
