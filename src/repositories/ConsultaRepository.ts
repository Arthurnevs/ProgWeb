import { PrismaClient, Consulta } from '@prisma/client';
import ConsultaStatus from "../enums/ConsultaStatusEnum";

export class ConsultaRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async findById(id: string): Promise<Consulta | null> {
        return await this.prismaClient.consulta.findUnique({
            where: { id },
        });
    }
    async getResultExame(hash: string): Promise<Consulta | null> {
        return await this.prismaClient.consulta.findFirst({
            where: { hash },
            include: {
                medico: {
                    select: {
                        name: true, // Incluir apenas o nome do médico
                    },
                },
            },
        });
    }
    //     async listConsultas(): Promise<Consulta[]> {


    async createConsulta(data: { hash: string; status: string; laudo: string; medicoId: string; dataConsulta: Date }): Promise<Consulta> {
        return await this.prismaClient.consulta.create({
            data,
        });
    }

    async updateConsulta(id: string, data: Partial<{ status: string; laudo: string; medicoId: string; dataConsulta: Date }>): Promise<Consulta> {
        return await this.prismaClient.consulta.update({
            where: { id },
            data,
        });
    }

    async deleteConsulta(id: string): Promise<Consulta> {
        return await this.prismaClient.consulta.delete({
            where: { id },
        });
    }

    async listConsultas(): Promise<Consulta[]> {
        return await this.prismaClient.consulta.findMany({
            include: {
                medico: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async listConsultasByMedico(medicoId: string) {
        return await this.prismaClient.consulta.findMany({
            where: { medicoId },
            include: { medico: true }, // Incluindo informações do médico, se necessário
        });
    }

    async addLaudo(id: string, laudo: string) {
        return await this.prismaClient.consulta.update({
            where: { id },
            data: {
                laudo, // Supondo que 'laudo' é um campo no modelo 'Consulta'
                status: ConsultaStatus.Confirmada, // Atualiza o status para Confirmada
            },
        });
    }
}
