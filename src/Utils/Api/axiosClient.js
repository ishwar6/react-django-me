import axios from "axios";

export const BASEURL = import.meta.env.VITE_BASEURL;

const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;