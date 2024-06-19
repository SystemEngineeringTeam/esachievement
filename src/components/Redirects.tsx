import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { $isAuthenticated } from "@/lib/stores/auth";
import { redirect } from "@/router";

export function Redirects({ children }: { children: ReactNode }): ReactNode {
  const { pathname } = useLocation();

  const isInPublicPaths = pathname === "/" || pathname.startsWith("/auth");
  if (!$isAuthenticated.get() && !isInPublicPaths) {
    redirect("/auth/login");
  }

  return children;
}
