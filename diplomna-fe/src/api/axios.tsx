import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL : "http://localhost:8080"
})

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    console.log(token)

    if (token && token !== undefined && token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      console.log('Token expired. Redirecting to login.');
      localStorage.removeItem('authToken');
      const navigate = useNavigate();
      navigate("/login");
    }

    return Promise.reject(error);
  }
);


export default api;