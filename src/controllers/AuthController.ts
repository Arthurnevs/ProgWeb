import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(request: Request, response: Response) {
        try {
            const { document, password } = request.body;
            const result = await this.authService.login(document, password);

            if (result.success) {
                return response.json({ message: 'Login successful', token: result.token });
            } else {
                return response.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async validateToken(request: Request, response: Response, next: NextFunction) {
        try {
            const authHeader = request.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return response.status(401).json({ message: 'Token not provided' });
            }

            const isValid = await this.authService.validateToken(token);

            if (isValid) {
                return next();
            } else {
                return response.status(401).json({ message: 'Invalid or expired token' });
            }
        } catch (error) {
            console.error('Error validating token:', error);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
