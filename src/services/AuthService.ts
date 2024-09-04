import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async login(document: string, password: string) {
        const user = await this.prismaClient.user.findUnique({
            where: { document },
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user.id, document: user.document },
                JWT_SECRET,
                { expiresIn: '1h' } // Token válido por 1 hora
            );

            return { success: true, token };
        } else {
            return { success: false };
        }
    }

    async validateToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return !!decoded;
        } catch (error) {
            return false;
        }
    }
}
