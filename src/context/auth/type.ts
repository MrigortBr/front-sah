import { jwt, LoginResponse } from "@/services/auth.service";
import { Response } from "@/services/proposal/type";

export interface User {
    id_permission: number;
    name: string;
    surname: string;
    permission: string;
    exp: number;
    iat: number;
    expires: Date;
    created: Date;
}

export interface AuthContextData {
    user: User | null;

    onlyReading: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    isPagePermitted: boolean;

    login: (email: string, password: string) => Promise<Response<jwt>>;

    logout: () => Promise<LoginResponse>;
}
