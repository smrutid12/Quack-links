import os
import axios from "axios";

// Set up base URL for your Flask backend
const api = axios.create({
  baseURL: os.getenv('BACKEND_URL'), // Update with your Flask server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
