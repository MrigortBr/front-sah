/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/context/auth/type";
import { api } from "./api";
import axios from "axios";
import { Response } from "./proposal/type";

interface LoginPayload {
    email: string;
    password: string;
}

export interface jwt {
    jwt: string;
}

export interface LoginResponse {
    data: { jwt: string };
    statusCode: number;
    status: boolean;
    message: string;
}

class AuthService {
    async login({ email, password }: LoginPayload): Promise<Response<jwt>> {
        try {
            const response = await api.post<Response<jwt>>("/login", {
                email,
                password,
            });

            const { jwt } = response.data.data;

            localStorage.setItem("sah_token", jwt);

            response.data.status = true;

            return response.data;
        } catch (err: any) {
            return this.goCatch<jwt>(err);
        }
    }

    async logout(): Promise<LoginResponse> {
        try {
            if (this.getToken() == null) {
                localStorage.clear();
                window.location.href = "/";
                return {
                    data: { jwt: "" },
                    message: "Seu login expirou!",
                    status: false,
                    statusCode: 404,
                };
            }

            const response = await api.delete<LoginResponse>("/loggout");
            localStorage.clear();

            if (typeof window !== "undefined") {
                window.location.href = "/";
            }

            response.data.status = true;
            return response.data;
        } catch (err: any) {
            err.response.data.status = false;
            localStorage.clear();

            return err.response.data;
        }
    }

    getToken(): string | null {
        return localStorage.getItem("sah_token");
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getUser(): User | null {
        const token = this.getToken();

        if (!token) return null;

        try {
            const payload = token.split(".")[1];

            const decoded: User = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

            const iat = new Date(decoded.iat * 1000);
            const exp = new Date(decoded.exp * 1000);
            const now = new Date();

            if (exp < now) return null;

            decoded.expires = exp;
            decoded.created = iat;

            return decoded;
        } catch {
            return null;
        }
    }

    private goCatch<T>(err: unknown): Response<T> {
        if (axios.isAxiosError<Response<T>>(err)) {
            return {
                ...err.response?.data,
                status: false,
            } as Response<T>;
        }

        return {
            statusCode: 404,
            status: false,
            data: {} as T,
            message: "Erro desconhecido",
        };
    }
}

export const authService = new AuthService();
