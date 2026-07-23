import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050/api",
  withCredentials: true,
});

// ================= TOKEN HANDLER =================
const getToken = (key) => {
  const data = localStorage.getItem(key);

  if (!data) return null;

  try {
    const parsed = JSON.parse(data);

    if (parsed?.token) {
      // Check expiry
      if (!parsed.expiry || Date.now() <= parsed.expiry) {
        return parsed.token;
      }

      // Remove expired token
      localStorage.removeItem(key);
      return null;
    }
  } catch {
    // Raw token string
  }

  return data;
};

// ================= REQUEST INTERCEPTOR =================
httpClient.interceptors.request.use(
  (config) => {
    const token =
      getToken("token") ||
      getToken("adminToken") ||
      getToken("sellerToken") ||
      getToken("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Important for file upload
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("sellerToken");
      localStorage.removeItem("userToken");

      // Optional redirect
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default httpClient;