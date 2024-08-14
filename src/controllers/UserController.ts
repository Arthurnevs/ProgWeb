import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { name, document, password } = request.body

        const prismaClient = new PrismaClient()
        
        const user =  await prismaClient.user.create({
            data: {
                name,
                document,
                password
            }
        })

        return response.json(user)
    }
}