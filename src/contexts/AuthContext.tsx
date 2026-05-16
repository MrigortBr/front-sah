"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PerfilUsuario, Usuario } from "@/types";
import { loginUser, logoutUser } from "@/services/api";

interface AuthContextValue {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string, perfil: PerfilUsuario) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Decodifica payload do JWT sem verificar assinatura (seguro no client). */
function decodeJwt(token: string): { id: number; permission: string } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded as { id: number; permission: string };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restaura usuário da sessão anterior ao carregar
  useEffect(() => {
    const stored = localStorage.getItem("sah_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("sah_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, senha: string, perfil: PerfilUsuario) => {
      const jwt = await loginUser(email, senha, true);

      const payload = decodeJwt(jwt);
      if (!payload) throw new Error("Token inválido recebido do servidor.");

      // Deriva perfil: usa a seleção da tela de login (tecnico / gestor)
      const usuario: Usuario = {
        id: payload.id,
        nome: email.split("@")[0] ?? "Usuário",
        sobrenome: "",
        perfil,
        setor: "DECAN",
      };

      localStorage.setItem("sah_token", jwt);
      localStorage.setItem("sah_user", JSON.stringify(usuario));
      setUser(usuario);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("sah_token");
      localStorage.removeItem("sah_user");
      setUser(null);
    }
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
