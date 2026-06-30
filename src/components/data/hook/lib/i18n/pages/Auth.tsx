import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

type AuthMode = "login" | "signup";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = (location.state as { from?: string } | null)?.from || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const ok = isSignup ? signup(name.trim(), email.trim(), password) : login(email.trim(), password);

    if (!ok) {
      toast({
        title: isSignup ? "Account already exists" : "Login failed",
        description: isSignup
          ? "Use login if you already created an Agri2rist account."
          : "Check your email and password, or create a new account.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isSignup ? "Account created" : "Welcome back",
      description: "You now have access to bookings, contact, shopping, and saved requests.",
    });
    navigate(from, { replace: true });
  };

  return (
    <PageLayout>
      <section className="bg-primary py-14 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">
            {isSignup ? "Create Your Agri2rist Account" : "Login to Agri2rist Hub"}
          </h1>
          <p className="text-primary-foreground/75 text-lg">
            Access real farm bookings, direct farm contacts, marketplace shopping, quotes, and saved reservations.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background px-4">
        <div className="container mx-auto max-w-md">
          <form onSubmit={submit} className="bg-card border border-border rounded-lg p-6 shadow-brand space-y-5">
            {isSignup && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={2}
                    placeholder="Your name"
                    className="pl-9"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@example.com"
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
              {isSignup ? "Create Account" : "Login"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {isSignup ? "Already have an account?" : "New to Agri2rist Hub?"}{" "}
              <Link
                to={isSignup ? "/login" : "/signup"}
                state={{ from }}
                className="font-semibold text-primary hover:underline"
              >
                {isSignup ? "Login" : "Sign up"}
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
