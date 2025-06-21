import axios from "axios";
import config from "../config.json";

const instance = axios.create({
  baseURL: config.apiUrl 
});

function setAuthToken(token) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export default {
  get: (url) => instance.get(url),
  post: (url, data) => instance.post(url, data),
  put: (url, data) => instance.put(url, data),
  patch: (url, data) => instance.patch(url, data),
  delete: (url) => instance.delete(url),
  setAuthToken
};
