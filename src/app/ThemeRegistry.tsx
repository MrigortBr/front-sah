"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { WorkDateProvider } from "@/contexts/WorkDateContext";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WorkDateProvider>{children}</WorkDateProvider>
    </AuthProvider>
  );
}