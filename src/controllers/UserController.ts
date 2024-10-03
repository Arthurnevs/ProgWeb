import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import {ValidationError} from "../errors/validationError";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(request: Request, response: Response) {
        try {
            const user = await this.userService.createUser(request.body);
            return response.status(201).json(user);
        } catch (error) {
            if (error instanceof ValidationError) {
                return response.status(400).json({ error: error.message });
            }
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUser(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            return response.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const user = await this.userService.updateUser(id, request.body);

            return response.status(200).json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
            const { id } = request.params;
            await this.userService.deleteUser(id);

            return response.status(204).send();
        } catch (error) {
            console.error('Error deleting user:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async listUsers(request: Request, response: Response) {
        try {
            const users = await this.userService.listUsers();
            return response.status(200).json(users);
        } catch (error) {
            console.error('Error listing users:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
