import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class CreateUserController {
    async handle(request: Request, response: Response){

        const { name, document } = request.body

        const prismaClient = new PrismaClient()
        
        const user =  await prismaClient.users.create({
            data: {
                name,
                document
            }
        })

        return response.json(user)
    }    
}