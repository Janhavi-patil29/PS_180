import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react"; // Import an icon
import { Button } from "@/components/ui/button"; // Import Shadcn Button

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log an error to the console for debugging non-existent routes
    console.error(
      `404 Error: User attempted to access non-existent route: ${location.pathname}`
    );
  }, [location.pathname]);

  return (
    // Use theme variables for consistent styling
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center p-8 max-w-md w-full">
        {/* Added an icon for better visual feedback */}
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />

        <h1 className="mb-4 text-6xl font-bold text-destructive">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Use Link for SPA navigation and Button for consistent styling */}
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;