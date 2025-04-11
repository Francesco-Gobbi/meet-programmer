
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center tider-gradient p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
          <Code className="h-10 w-10 text-tider-brown" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-tider-brown">404</h1>
        <p className="text-xl text-tider-brown mb-6">Error: Path not found</p>
        <pre className="bg-white/20 p-4 rounded-md text-left mb-6 font-mono text-tider-brown">
          {`try {
  accessPage("${location.pathname}");
} catch (error) {
  console.error("Page not found");
  redirect("/");
}`}
        </pre>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-tider-brown text-white hover:bg-tider-brown/90"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
