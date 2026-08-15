// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5060/api",
// });

// // Send JWT token with every request
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Remove Content-Type for FormData
//     if (config.data instanceof FormData) {
//       delete config.headers["Content-Type"];
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API; 





















// import axios from "axios";
// import { auth } from "../../firebase";

// const API = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "http://localhost:5060/api",
// });

// // =====================================================
// // FIREBASE AUTH TOKEN
// // =====================================================

// API.interceptors.request.use(
//   async (config) => {
//     try {
//       const firebaseUser = auth.currentUser;

//       if (firebaseUser) {
//         const token = await firebaseUser.getIdToken();

//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       // Let browser set multipart/form-data boundary
//       if (config.data instanceof FormData) {
//         delete config.headers["Content-Type"];
//       }
//     } catch (error) {
//       console.error("Firebase token error:", error);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;






import axios from "axios";
import { auth } from "../../firebase";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5060/api",
});

API.interceptors.request.use(async (config) => {
  try {
    // Admin token
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      config.headers["X-Admin-Token"] = adminToken;
    }

    // Firebase user token
    const firebaseUser = auth.currentUser;

    if (firebaseUser) {
      const firebaseToken = await firebaseUser.getIdToken();

      config.headers.Authorization = `Bearer ${firebaseToken}`;
    }

    // Let browser set multipart boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

  } catch (error) {
    console.error("Authentication error:", error);
  }

  return config;
});

export default API;