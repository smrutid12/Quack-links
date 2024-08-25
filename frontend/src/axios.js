import axios from "axios";

// Set up base URL for your Flask backend
const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // Update with your Flask server URL
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(api, "ddddddddd");
export default api;
