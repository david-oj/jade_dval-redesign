import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! Page not found
        </p>
        <button
          onClick={handleRoute}
          className="text-primary hover:text-primary/80 underline hover:cursor-pointer"
        >
          Return to dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
