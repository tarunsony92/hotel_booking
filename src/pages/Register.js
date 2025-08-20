import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "./Register.css";
import Navbar from "../components/Navbar";
import axios from "axios"; // make sure axios is installed



const Register = () => {
  const [role, setRole] = useState("");
  const [location, setlocation] = useState("");
  const navigate = useNavigate(); // ← for redirection
    
    
  


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleRegister = async () => {
  try {
    const res = await axios.post(
      "https://hotel-backend-production-8070.up.railway.app/api/auth/register",
      {
        full_name: fullName,
        email,
        password,
        role,
        location: role === "seller" ? location : null,
      }
    );

    console.log("Response:", res.data); // ✅ check backend response
    alert(res.data.message);

    localStorage.setItem("isLoggedIn", "true"); // login status
    localStorage.setItem("userRole", role);    // role bhi save karo

    // ✅ Role-based redirect
    if (role === "seller") {
      navigate("/seller");
    } else {
      navigate("/user");
    }
  } catch (err) {
    console.error("Registration error:", err.response || err);
    alert(err.response?.data?.error || "Registration failed");
  }
};


const handleFormSubmit = (e) => {
  e.preventDefault();     // ✅ stop form reload
  handleRegister();       // ✅ no need to pass event
};



  return (
    <div className="index-page">
      <Navbar />
      <div className="register-page">
        <div className="register-card">
          <h2>Create Your Account</h2>



<div className="role-options">
  <label className={`role-btn ${role === "user" ? "selected" : ""}`}>
    <input
      type="radio"
      name="role"
      value="user"
      checked={role === "user"}
      onChange={(e) => setRole(e.target.value)}
    />
    User
  </label>

  <label className={`role-btn ${role === "seller" ? "selected" : ""}`}>
    <input
      type="radio"
      name="role"
      value="seller"
      checked={role === "seller"}
      onChange={(e) => setRole(e.target.value)}
    />
    Seller
  </label>
</div>


          <form className="register-form" onSubmit={handleFormSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            {role === "seller" && (
            <>
            <label>Location</label>
            <input
            type="text"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            placeholder="Enter your shop location"
/>
            </>
            )}


            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <button type="submit">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
