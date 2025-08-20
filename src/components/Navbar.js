import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const dashboardPath = userType === "seller" ? "/seller" : "/user";
  const bookingPath = userType === "seller" ? "/sellerbooking" : "/app";

  return (
    <nav className="navbar">
      <div className="navbar-brand">🏨 HotelBook</div>

      {/* Hamburger for mobile */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        {isLoggedIn ? (
          <>
            <Link to={dashboardPath} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link to={bookingPath} onClick={() => setMenuOpen(false)}>Booking</Link>
            <Link to="/" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/app" onClick={() => setMenuOpen(false)}>Booking</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}

        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
