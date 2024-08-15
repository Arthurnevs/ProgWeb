import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from "@prisma/client";
import {NextFunction} from "connect";


export class AuthController {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async login(request: Request, response: Response) {
        const { document, password } = request.body;

        const user = await this.prismaClient.user.findUnique({
            where: { document }
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = uuidv4();

            await this.prismaClient.session.create({
                data: {
                    token,
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 3600 * 1000)
                }
            });

            return response.json({ message: 'Login successful', token });
        } else {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
    }

    async validateToken(request: Request, response: Response, next: NextFunction) {
        const token = request.headers['token'] as string;

        if (!token) {
            return response.status(401).json({ message: 'Token is missing' });
        }

        try {
            const session = await this.prismaClient.session.findUnique({
                where: { token: token }
            });

            if (session && session.expiresAt > new Date()) {
                return next();
            } else {
                return response.status(401).json({ message: 'Invalid or expired token' });
            }
        } catch (error) {
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
