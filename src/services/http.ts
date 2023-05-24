import axios from "axios";
import { AUTH_KEYS } from "configs/auth";
import { getLocalStorage } from "configs/localStorage";

const http = axios.create({
  baseURL: "http://localhost:8080/v1/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + getLocalStorage(AUTH_KEYS.ACCESS_TOKEN),
  },
});

export default http;
