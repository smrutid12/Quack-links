import axios from "axios";

// Set up base URL for your Flask backend
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Use environment variable for Flask server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
