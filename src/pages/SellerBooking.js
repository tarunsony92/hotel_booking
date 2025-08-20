import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./SellerBooking.css"; // optional: styling ke liye
import Navbar from '../components/Navbar';

const SellerBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  axios.get("https://hotel-backend-production-8070.up.railway.app/api/bookings/all-bookings")
    .then((res) => {
      const sortedBookings = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBookings(sortedBookings);
    })
    .catch((err) => console.error("Error fetching bookings:", err));
}, []);


  return (
    <div className="index-page">
      <Navbar />
    <div className="seller-page">
      <h2>📋 All Booked Rooms</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>📞 Phone</th>
              <th>⚧ Gender</th> 
              <th>🎂 Age</th>
              <th>🏠 Address</th>
              <th>🛏️ Rooms</th>
              <th>📅 Date</th>
              <th>📅 Release Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.gender}</td>
                <td>{booking.age}</td>
                <td>{booking.address}</td>
                <td>{booking.rooms}</td>
                <td>{new Date(booking.created_at).toLocaleString()}</td>
                <td>{new Date(booking.releaseDateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default SellerBooking;
