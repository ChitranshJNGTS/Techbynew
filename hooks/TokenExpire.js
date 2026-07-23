import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem("sellerToken") || "{}");
      if (stored.expiry && Date.now() > stored.expiry) {
        localStorage.removeItem("sellerToken");
        navigate("/seller-login"); // redirect to login
      }
    }, 60 * 1000); // check every minute

    return () => clearInterval(interval);
  }, [navigate]);
};