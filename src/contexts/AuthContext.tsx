"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PerfilUsuario, Usuario } from "@/types";

interface AuthContextValue {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (login: string, senha: string, perfil: PerfilUsuario) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Mock users — substituir por chamada real quando a API tiver auth ──────────

const MOCK_USERS: Record<string, Usuario> = {
  "tecnico.decan": {
    id: 1,
    nome: "Tayana",
    sobrenome: "Pinheiro",
    perfil: "tecnico",
    setor: "DECAN",
  },
  "gestor.decan": {
    id: 2,
    nome: "Carlos",
    sobrenome: "Mendes",
    perfil: "gestor",
    setor: "DECAN",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sah_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (loginStr: string, _senha: string, _perfil: PerfilUsuario) => {
      // TODO: trocar por chamada real à API quando endpoint de auth estiver pronto
      await new Promise((r) => setTimeout(r, 800)); // simula latência

      const key = loginStr.toLowerCase();
      const mockUser = MOCK_USERS[key] ?? MOCK_USERS["tecnico.decan"];
      mockUser.perfil = _perfil;

      localStorage.setItem("sah_user", JSON.stringify(mockUser));
      // localStorage.setItem("sah_token", "mock-jwt-token"); // descomente quando tiver JWT real
      setUser(mockUser);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("sah_user");
    localStorage.removeItem("sah_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
