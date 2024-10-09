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
        // Tentar encontrar o usuário na tabela User
        let user = await this.prismaClient.user.findUnique({
            where: { document },
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user.id, document: user.document, userType: 'user' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { success: true, token, userType: 'user', userId: user.id };
        }

        // Se não encontrar o usuário, tenta buscar na tabela Medico
        let medico = await this.prismaClient.medico.findUnique({
            where: { document },  // Agora o campo `document` é único no modelo Medico
        });

        if (medico && await bcrypt.compare(password, medico.password)) {
            const token = jwt.sign(
                { medicoId: medico.id, document: medico.document, userType: 'medico' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { success: true, token, userType: 'medico', userId: medico.id };
        }

        // Caso não encontre nem em User nem em Medico, retorna falha
        return { success: false, message: 'Credenciais inválidas.' };
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
