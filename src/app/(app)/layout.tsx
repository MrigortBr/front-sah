"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const PUBLIC_PATHS = ["/senha"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!isLoading && !isPublic && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isLoading, isPublic, router]);

  if (isLoading) return null;
  if (!isPublic && !isAuthenticated) return null;
  return <>{children}</>;
}
