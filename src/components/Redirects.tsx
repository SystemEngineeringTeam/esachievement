import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Navigate } from "@/router";

export function Redirects({ children }: { children: ReactNode }): ReactNode {
  const { pathname } = useLocation();

  const isInPublicPaths = pathname === "/" || pathname.startsWith("/auth");
  if (!$hasAuthenticated.get() && !isInPublicPaths) {
    // eslint-disable-next-line no-console
    console.warn("Member is not authenticated; Redirecting to `/`...");
    return <Navigate replace to="/ranking" />;
  }

  return children;
}
