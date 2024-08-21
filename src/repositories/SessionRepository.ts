import { PrismaClient, Session } from '@prisma/client';

export class SessionRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async createSession(data: { token: string; userId: string; expiresAt: Date }): Promise<Session> {
        return await this.prismaClient.session.create({
            data,
        });
    }

    async findSessionByToken(token: string): Promise<Session | null> {
        return await this.prismaClient.session.findUnique({
            where: { token },
        });
    }

    async deleteSession(token: string): Promise<Session> {
        return await this.prismaClient.session.delete({
            where: { token },
        });
    }

    async listSessions(): Promise<Session[]> {
        return await this.prismaClient.session.findMany();
    }
}
