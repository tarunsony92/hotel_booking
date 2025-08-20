// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ConfirmPage from "./pages/ConfirmPage";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://hotel-backend-production-8070.up.railway.app/api/rooms");
        setRooms(response.data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (roomNumber) => {
    const clicked = rooms.find((r) => r.roomNumber === roomNumber);
    if (clicked.status === "booked") return;

    if (selectedRooms.includes(roomNumber)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== roomNumber));
    } else {
      setSelectedRooms([...selectedRooms, roomNumber]);
    }
  };

  const handleBook = () => {
    const canBook = selectedRooms.every(
      (rNum) => rooms.find((r) => r.roomNumber === rNum && r.status === "available")
    );

    if (!canBook) {
      alert("Some selected rooms are already booked.");
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Please login first to continue booking.");
      navigate("/login");
      return;
    }

    navigate("/app/confirm");
  };

  const handleReset = async () => {
    try {
      const res = await axios.get("https://hotel-backend-production-8070.up.railway.app/api/rooms");
      setRooms(res.data);
      setSelectedRooms([]);
    } catch (error) {
      console.error("Error resetting rooms:", error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="index-page">
            <Navbar />
            <div className="App booking-container">
              <h1 className="page-title">🏨 Hotel Room Reservation</h1>
              <div className="action-buttons">
                <button
                  className="primary-btn"
                  onClick={handleBook}
                  disabled={selectedRooms.length === 0}
                >
                  📅 Book ({selectedRooms.length})
                </button>
                <button className="reset-btn" onClick={handleReset}>
                  🔄 Reset
                </button>
              </div>

              <div className="room-grid">
                {rooms.map((room) => (
                  <div
                    key={room.roomNumber}
                    className={`room-card ${
                      room.status === "booked"
                        ? "booked"
                        : selectedRooms.includes(room.roomNumber)
                        ? "selected"
                        : "available"
                    }`}
                    onClick={() => handleRoomClick(room.roomNumber)}
                  >
                    <span className="room-number">Room {room.roomNumber}</span>
                    <span className="room-status">
                      {room.status === "booked" ? "❌ Booked" : "✅ Available"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <Route
        path="/confirm"
        element={
          <ConfirmPage
            rooms={rooms}
            setRooms={setRooms}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />
        }
      />
    </Routes>
  );
}

export default App;
