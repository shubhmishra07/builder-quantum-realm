import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-green-700">404</h1>
        <p className="text-lg text-muted-foreground mt-2">Oops! Page not found</p>
        <a href="/" className="inline-block mt-4 rounded-md bg-green-600 text-white px-4 py-2">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;
