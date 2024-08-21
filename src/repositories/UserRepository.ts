import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async findById(id: string): Promise<User | null> {
        return await this.prismaClient.user.findUnique({
            where: { id },
        });
    }

    async findByDocument(document: string): Promise<User | null> {
        return await this.prismaClient.user.findUnique({
            where: { document },
        });
    }

    async createUser(data: { name: string; document: string; password: string }): Promise<User> {
        return await this.prismaClient.user.create({
            data,
        });
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return await this.prismaClient.user.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: string): Promise<User> {
        return await this.prismaClient.user.delete({
            where: { id },
        });
    }

    async listUsers(): Promise<User[]> {
        return await this.prismaClient.user.findMany();
    }
}
