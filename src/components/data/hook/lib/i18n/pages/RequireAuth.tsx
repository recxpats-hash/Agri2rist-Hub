/**
 * Agri2rist Hub – RequireAuth guard
 * Optionally enforces a required role (e.g. "admin").
 */
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types/marketplace";

interface RequireAuthProps {
  children: ReactNode;
  role?: UserRole;
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Role-gated pages: redirect non-admins to home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
