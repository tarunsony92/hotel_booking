// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import IndexPage from "./IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import "./index.css";
import SellerPage from "./pages/SellerPage";
import SellerBooking from "./pages/SellerBooking";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<IndexPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/seller" element={<SellerPage />} />

      {/* All booking logic, including /confirm, is inside App.js */}
      <Route path="/app/*" element={<App />} />
      <Route path="/sellerbooking" element={<SellerBooking />} />
    </Routes>
  </BrowserRouter>
);
