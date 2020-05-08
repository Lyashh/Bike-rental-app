import axios from "axios";

export const getAwailableBikes = () => {
  return axios
    .get("/api/bikes/available")
    .then((res) => {
      if (res.status === 200) {
        return res.data; // array
      }
    })
    .catch((e) => e);
};

export const getRentBikes = () => {
  return axios
    .get("/api/rent")
    .then((res) => {
      if (res.status === 200) {
        return res.data; // array
      }
    })
    .catch((e) => e);
};
