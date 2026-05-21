"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { authService, jwt, LoginResponse } from "@/services/auth.service";
import { AuthContextData, User } from "./type";
import { iCanAcess } from "@/services/iCanAcess";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { PagesPermissions } from "@/data/pages";
import { Response } from "@/services/proposal/type";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [onlyReading, setOnlyReading] = useState(true);

    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === "undefined") {
            setIsLoading(true);
            return null;
        }
        return authService.getUser();
    });

    const [isPagePermitted, setIsPagePermitted] = useState<boolean>(false);

    const login = useCallback(async (email: string, password: string) => {
        const response = await authService.login({
            email,
            password,
        });

        if (!response.status) {
            return response;
        }

        const userData = authService.getUser();

        if (userData) setOnlyReading(!(userData.id_permission < 3));
        else setOnlyReading(true);

        setUser(userData);

        router.push(PagesPermissions[pathname].go);
        return response;
    }, []);

    const logout = useCallback(async () => {
        const response = await authService.logout();

        if (!response.status) {
            return response;
        }

        setUser(null);
        return response;
    }, []);

    useEffect(() => {
        const result = iCanAcess(pathname, user?.id_permission);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsPagePermitted(result.allowed);

        if (!result.allowed) {
            router.replace(result.redirect);
        }

        if (user) setOnlyReading(!(user.id_permission < 3));
        else setOnlyReading(true);

        setIsLoading(false);
    }, [pathname, user, router]);

    return (
        <AuthContext.Provider
            value={{
                user,
                onlyReading,
                isAuthenticated: !!user,
                isLoading,
                isPagePermitted,

                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
