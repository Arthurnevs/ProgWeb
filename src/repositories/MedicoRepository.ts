import { PrismaClient, Medico } from '@prisma/client';

export class MedicoRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async findById(id: string): Promise<Medico | null> {
        return await this.prismaClient.medico.findUnique({
            where: { id },
        });
    }

    async createMedico(data: { name: string; especialidade: string, document: string, password: string }): Promise<Medico> {
        return await this.prismaClient.medico.create({
            data,
        });
    }

    async updateMedico(id: string, data: Partial<{ name: string; especialidade: string }>): Promise<Medico> {
        return await this.prismaClient.medico.update({
            where: { id },
            data,
        });
    }

    async deleteMedico(id: string): Promise<Medico> {
        return await this.prismaClient.medico.delete({
            where: { id },
        });
    }

    async listMedicos(): Promise<Medico[]> {
        return await this.prismaClient.medico.findMany();
    }
}
