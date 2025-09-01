import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AUTH_TOKEN_KEY as TOKEN_KEY } from "@/lib/api";

const AUTH_TOKEN_KEY = TOKEN_KEY

const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      navigate(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }
    const issued = Number(token);
    // expiration: 1 hour
    if (Date.now() - issued > 3600000) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      navigate(`/login?expired=true`);
    }
  }, [navigate, pathname]);
};

export default useAuthGuard;
