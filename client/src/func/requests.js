import axios from "axios";

export const getAvailableBikes = () => {
  return axios.get("/api/bikes/available");
};

export const getRentBikes = () => {
  return axios.get("/api/rent");
};

export const deleteBikeRent = (id) => {
  return axios.delete("/api/rent", { data: { id: Number.parseInt(id) } });
};

export const rentBike = (id) => {
  return axios.post("/api/rent", { id: Number.parseInt(id) });
};

export const getCatgs = () => {
  return axios.get("/api/bikes/categories");
};

export const createBike = (newItem) => {
  return axios.post("/api/bikes", newItem);
};

export const setNotAvailable = (id) => {
  return axios.patch("/api/bikes", { id });
};
