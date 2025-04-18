
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Heart } from "lucide-react";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, register, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to Tider for Programmers!",
      });
      navigate("/home");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials. Please try again.",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      toast({
        title: "Registration successful",
        description: "Welcome to Tider for Programmers!",
      });
      navigate("/onboarding");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center tider-gradient p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="text-tider-brown mb-4">
          <Heart className="h-10 w-10 text-tider-red" />
        </div>
        <h1 className="text-4xl font-bold text-tider-brown mb-2 text-center">Meet Spicy Programmer</h1>
        <p className="text-tider-brown opacity-80 text-center">Find your perfect pair programming partner</p>
      </div>

      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold text-tider-brown">Welcome</h2>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-tider-red hover:bg-opacity-90" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-tider-red hover:bg-opacity-90" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Button 
        variant="link" 
        className="mt-4 text-[#1A1F2C] font-semibold hover:text-[#403E43]"
        onClick={() => navigate("/onboarding")}
      >
        Skip login (demo)
      </Button>
    </div>
  );
};

export default Welcome;
