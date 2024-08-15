import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import {AuthController} from "./AuthController";

export class UserController {
    private prismaClient: PrismaClient;
    private authController: AuthController;

    constructor() {
        this.prismaClient = new PrismaClient();
        this.authController = new AuthController()
    }

    async create(request: Request, response: Response){
        const { name, document, password } = request.body

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user =  await this.prismaClient.user.create({
            data: {
                name,
                document,
                password: hashedPassword
            }
        })

        return response.json(user)
    }

    async registerDoctor(request: Request, response: Response){
        const { name, especialidade } = request.body

        const doctor = await this.prismaClient.medico.create({
            data: {
                name: name,
                especialidade: especialidade
            }
        })

        return response.json(doctor)
    }
}