import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://65251c5a67cfb1e59ce6a2f5.mockapi.io/api/blog",
  headers: {
    "Content-Type": "application/json",
  },
});
