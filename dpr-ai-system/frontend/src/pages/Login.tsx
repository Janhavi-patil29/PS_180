import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Import the auth hook
import { jwtDecode } from "jwt-decode"; // Import the JWT decoder
import { useToast } from "@/hooks/use-toast"; // Import toast for errors

// Define the shape of the User object we expect from the token
interface User {
  username: string;
  role: string;
}

// Define the shape of the decoded JWT payload
interface DecodedToken {
  sub: string; // Subject (username)
  role: string;
  user_id: string;
  exp: number;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for errors
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Hook for redirection
  const { toast } = useToast(); // Hook for showing toasts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // 1. Send request to the backend /token endpoint
      // This endpoint expects form data, not JSON
      const response = await fetch("http://localhost:8001/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      // 2. Handle the response
      if (!response.ok) {
        // If response is not 200 OK, throw an error
        const errorData = await response.json();
        throw new Error(errorData.detail || "Incorrect username or password");
      }

      // 3. Get the token from the response
      const data: { access_token: string; token_type: string } = await response.json();
      const { access_token } = data;

      // 4. Decode the token to get user info
      const decodedToken = jwtDecode<DecodedToken>(access_token);
      const user: User = {
        username: decodedToken.sub,
        role: decodedToken.role,
      };

      // 5. Call the login function from AuthContext
      login(access_token, user);

      // 6. Redirect to the dashboard
      navigate("/");

    } catch (err: any) {
      // 7. Handle errors
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-md border-border">
        <CardHeader className="text-center space-y-2">
          <Database className="w-12 h-12 mx-auto text-primary" />
          <CardTitle className="text-2xl font-bold text-foreground">
            DPR AI System Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Show error message if login fails */}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            © 2025 MDONER. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;