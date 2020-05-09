import axios from "axios";

export const getAwailableBikes = () => {
  return axios.get("/api/bikes/available");
};

export const getRentBikes = () => {
  return axios.get("/api/rent");
};

export const deleteBikeRent = (id) => {
  return axios.delete("/api/rent", { data: { id: Number.parseInt(id) } });
};
