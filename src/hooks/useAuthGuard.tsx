import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
};

export default useAuthGuard;
