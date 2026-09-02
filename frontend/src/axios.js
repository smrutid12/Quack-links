import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createQuackLink = async (originalUrl) => {
  const response = await api.post("/generate_quack_link/quack_link", {
    original_url: originalUrl,
  });

  return response.data;
};

export const fetchOriginalURL = async (shortId) => {
  const response = await api.get(`/generate_quack_link/original/${shortId}`);
  return response.data.original_url;
};