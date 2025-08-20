// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  // Dashboard path decide based on userType
  const dashboardPath = userType === "seller" ? "/seller" : "/user";
  const bookingPath = userType === "seller" ? "/sellerbooking" : "/app";

  return (
    <nav className="navbar">
      <div className="navbar-brand">🏨 HotelBook</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        

        {isLoggedIn ? (
          <>
            <Link to={dashboardPath}>Dashboard</Link>
            <Link to={bookingPath}>Booking</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/app">Booking</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
