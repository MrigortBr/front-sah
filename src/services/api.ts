import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Api {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("sah_token");

            if (token) {
                config.headers.Authorization = `${token}`;
            }

            return config;
        });
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get(url, config);
    }

    public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post(url, data, config);
    }

    public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.put(url, data, config);
    }

    public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.patch(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.delete(url, config);
    }
}

export const api = new Api();
