import axios from "axios";
import { api } from "../api";
import { CnesData } from "./type";
import { Response } from "../proposal/type";

class EstablishmentService {
    async getDataEstablishment(code: string): Promise<Response<CnesData>> {
        try {
            const response = await api.get<Response<CnesData>>(`/establishment/listbycnes/${code}`);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<CnesData>(err);
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

export const establishmentService = new EstablishmentService();
