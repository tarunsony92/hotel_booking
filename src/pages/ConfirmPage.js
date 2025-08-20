// src/pages/ConfirmPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConfirmPage.css";
import Navbar from "../components/Navbar";

const ConfirmPage = ({ rooms, selectedRooms, setRooms, setSelectedRooms }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
    email: storedUser.email || "", // auto-filled from localStorage
    releaseDateTime: "", // added releaseDateTime here
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    // validation including releaseDateTime
    if (
      !formData.name ||
      !formData.age ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.releaseDateTime
    ) {
      alert("Please fill all the fields including release date and time.");
      return;
    }

    if (selectedRooms.length === 0) {
      alert("Please select at least one room.");
      return;
    }

    const updatedRooms = rooms.map((room) =>
      selectedRooms.includes(room.roomNumber)
        ? { ...room, status: "booked" }
        : room
    );

    setRooms(updatedRooms);
    setSelectedRooms([]);

    try {
      await axios.post("https://hotel-backend-production-8070.up.railway.app//api/bookings/book", {
        ...formData,
        // email: localStorage.getItem("userEmail"),
        selectedRooms,
      });

      alert(`Rooms booked: ${selectedRooms.join(", ")}`);
      navigate("/app");
    } catch (err) {
      console.error(err);
      alert("Error saving to database.");
    }
  };

  return (
    <div className="index-page">
      <Navbar />
      <div className="confirm-page">
        <div className="confirm-card">
          <h2 className="confirm-heading">
            Confirm Your <span>Booking</span>
          </h2>

          <p className="selected-rooms">
            <strong>Selected Rooms:</strong>{" "}
            {selectedRooms.length > 0 ? selectedRooms.join(", ") : "None"}
          </p>

          <div className="form">
  {["name", "age", "address", "phone"].map((field) => (
    <div className="form-group" key={field}>
      <label htmlFor={field}>
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <input
        id={field}
        type={
          field === "age"
            ? "number"
            : field === "phone"
            ? "tel"
            : "text"
        }
        name={field}
        placeholder={`Enter your ${field}`}
        value={formData[field]}
        onChange={handleInputChange}
        className="form-input"
      />
    </div>
  ))}

  {/* Email field - auto-filled & read-only */}
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      name="email"
      value={formData.email}
      readOnly
      className="form-input"
    />
  </div>

  {/* Gender dropdown */}
  <div className="form-group">
  <label>Gender</label>
  <div className="gender-options">
    {["Male", "Female", "Other"].map((option) => (
      <label key={option} className="gender-label">
        <input
          type="radio"
          name="gender"
          value={option}
          checked={formData.gender === option}
          onChange={handleInputChange}
        />
        <span className="gender-text">{option}</span>
      </label>
    ))}
  </div>
</div>




            {/* New Release DateTime input */}
            <div className="form-group">
              <label htmlFor="releaseDateTime">Release Date & Time</label>
              <input
                id="releaseDateTime"
                type="datetime-local"
                name="releaseDateTime"
                placeholder="Select release date and time"
                value={formData.releaseDateTime}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <button className="confirm-button" onClick={handleConfirm}>
              ✅ Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
