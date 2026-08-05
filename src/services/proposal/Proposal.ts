import axios from "axios";
import { api } from "../api";
import { DataHab, HabilitacaoExitingResponse, Response, SimpleProposal } from "./type";

class ProposalService {
    async getSimpleProposal(): Promise<Response<SimpleProposal[]>> {
        try {
            const response = await api.get<Response<SimpleProposal[]>>("/proposal/simpleForms");

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<SimpleProposal[]>(err);
        }
    }

    async getSimpleProposalFilter(filter: string): Promise<Response<SimpleProposal[]>> {
        try {
            const response = await api.get<Response<SimpleProposal[]>>(`/proposal/simpleForms?filter=${filter}`);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<SimpleProposal[]>(err);
        }
    }

    async getProposalData() {
        try {
            const response = await api.get<Response<DataHab>>("/proposal");

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<DataHab>(err);
        }
    }

    async getEstablishmentName(cnes: string): Promise<Response<{ cnes: string; nome_estabelecimento: string } | null>> {
        try {
            const response = await api.get<Response<{ cnes: string; nome_estabelecimento: string } | null>>(`/establishment/name/${cnes}`);
            response.data.status = true;
            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<{ cnes: string; nome_estabelecimento: string } | null>(err);
        }
    }

    async softDelete(id: number) {
        try {
            const response = await api.delete<Response<null>>(`/proposal/${id}`);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<null>(err);
        }
    }

    async getLengthProposal() {
        try {
            const response = await api.get<Response<{ situacao: string }[]>>("/proposal/count");

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<{ situacao: string }[]>(err);
        }
    }

    async getProposalsByCnes(cnes: string): Promise<Response<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>> {
        try {
            const response = await api.get<Response<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>>(`/proposal/proposals-by-cnes/${cnes}`);
            response.data.status = true;
            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>(err);
        }
    }

    async getHistoricosByCnes(cnes: string): Promise<Response<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>> {
        try {
            const response = await api.get<Response<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>>(`/proposal/historicos-by-cnes/${cnes}`);
            response.data.status = true;
            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<{ id: number; situacao: string; inicioSaips: string | null; numeroSaips: string; codigos: string[] }[]>(err);
        }
    }

    async getActiveByCnes(cnes: string): Promise<Response<{ id: number; codigos: string[] } | null>> {
        try {
            const response = await api.get<Response<{ id: number; codigos: string[] } | null>>(`/proposal/active-cnes/${cnes}`);
            response.data.status = true;
            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<{ id: number; codigos: string[] } | null>(err);
        }
    }

    async getProposalDataForForm(id: number) {
        try {
            const response = await api.get<Response<HabilitacaoExitingResponse>>(`/proposal/list/${id}`);
            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<HabilitacaoExitingResponse>(err);
        }
    }

    async insertNewProposal(payload: unknown): Promise<Response<SimpleProposal[]>> {
        try {
            const response = await api.put<Response<SimpleProposal[]>>("/proposal", payload);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<SimpleProposal[]>(err);
        }
    }

    async updateProposal(payload: unknown, id: number): Promise<Response<SimpleProposal[]>> {
        try {
            const response = await api.patch<Response<SimpleProposal[]>>(`/proposal/${id}`, payload);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<SimpleProposal[]>(err);
        }
    }

    async updateProposalActive(payload: unknown, id: number): Promise<Response<SimpleProposal[]>> {
        try {
            const response = await api.patch<Response<SimpleProposal[]>>(`/proposal/active/${id}`, payload);

            response.data.status = true;

            return response.data;
        } catch (err: Response<undefined> | unknown) {
            return this.goCatch<SimpleProposal[]>(err);
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

export const proposalService = new ProposalService();
