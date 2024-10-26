import axios from "axios";

let API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "https://api.quacklinks.com";
// Set up base URL for your Flask backend
export const api = axios.create({
  baseURL: API_BASE_URL, // Use environment variable for Flask server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchOriginalURL = async (short_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${short_id}`);
    if (response.status === 200 && response.data.original_url) {
      return response.data.original_url; // Return the original URL if found
    }
    return null; // No URL found
  } catch (error) {
    console.error("Error fetching the original URL:", error);
    throw error; // Let the component handle the error
  }
};
