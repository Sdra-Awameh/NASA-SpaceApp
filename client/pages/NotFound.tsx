import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
  <div className="cc-notfound-page">
      <div className="cc-notfound-content">
        <h1 className="cc-notfound-title">404</h1>
        <p className="cc-notfound-desc">Oops! Page not found</p>
        <a href="/" className="cc-notfound-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
