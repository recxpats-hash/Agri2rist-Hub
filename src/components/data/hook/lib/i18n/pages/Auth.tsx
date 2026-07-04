import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { checkRateLimit, resetRateLimit, remainingAttempts } from "@/lib/security";
import { validateSignupForm, sanitizeEmail } from "@/lib/validation";

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [blocked, setBlocked] = useState(false);

  const from = (location.state as { from?: string } | null)?.from || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setFieldErrors({});

    const cleanEmail = sanitizeEmail(email);
    const rateLimitKey = `auth:${cleanEmail}`;

    // Rate-limit: 5 attempts per minute
    if (!checkRateLimit(rateLimitKey, 5, 60_000)) {
      setBlocked(true);
      toast({
        title: "Too many attempts",
        description: "Please wait 60 seconds before trying again.",
        variant: "destructive",
      });
      return;
    }

    // Validate signup fields
    if (isSignup) {
      const errs = validateSignupForm({ name, email: cleanEmail, password });
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        return;
      }
    }

    const ok = isSignup
      ? await signup(name.trim(), cleanEmail, password)
      : await login(cleanEmail, password);

    if (!ok) {
      const rem = remainingAttempts(rateLimitKey, 5, 60_000);
      toast({
        title: isSignup ? "Account already exists" : "Login failed",
        description: isSignup
          ? "An account with this email already exists. Try logging in."
          : `Check your email and password. ${rem} attempt${rem !== 1 ? "s" : ""} remaining.`,
        variant: "destructive",
      });
      return;
    }

    resetRateLimit(rateLimitKey);
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

            <Button
              type="submit"
              disabled={blocked}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
            >
              {isSignup ? "Create Account" : "Login"}
            </Button>

            {blocked && (
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-3 py-2 text-xs">
                <AlertCircle size={14} /> Too many attempts. Please wait 60 seconds.
              </div>
            )}

            {Object.values(fieldErrors).length > 0 && (
              <ul className="text-xs text-destructive space-y-1">
                {Object.values(fieldErrors).map((e, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <AlertCircle size={11} /> {e}
                  </li>
                ))}
              </ul>
            )}

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
