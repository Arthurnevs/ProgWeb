import { PrismaClient, Consulta } from '@prisma/client';

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
}
