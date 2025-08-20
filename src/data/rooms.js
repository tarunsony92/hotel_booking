import axios from "axios";

export const generateRooms = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms`);// ✅ Backend se fetch
    return response.data; // [{ roomNumber: '101', floor: 1, status: 'available' }, ...]
  } catch (err) {
    console.error("Error fetching rooms from backend:", err);
    return []; // fallback empty list
  }
};