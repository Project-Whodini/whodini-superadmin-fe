import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import appHeaderLogo from "@/assets/app-header-logo.png";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // For now any input "logs in" and redirects to the dashboard.
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-lg border border-slate-200">
          <CardHeader className="space-y-3 flex flex-col items-center">
            <img
              src={appHeaderLogo}
              alt="Whodini Admin"
              className="w-10 h-10 rounded-lg object-cover shadow-md shadow-orange-500/20"
            />
            <CardTitle className="text-2xl font-display text-slate-900 text-center">
              Sign in to Whodini Admin
            </CardTitle>
            {/* <p className="text-sm text-muted-foreground text-center">
              Sign in with your Whodini Admin credentials.
            </p> */}
          </CardHeader>
          <CardContent className="pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-slate-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs text-slate-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white text-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

