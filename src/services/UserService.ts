import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import {ValidationService} from "./ValidationService";
import {ValidationError} from "../errors/validationError";


export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    private validateUserData(data: { name: string; document: string; password: string }) {
        const errors: string[] = [];

        const nameError = ValidationService.isRequired(data.name, 'Name');
        if (nameError) errors.push(nameError);

        const documentError = ValidationService.isRequired(data.document, 'Document') || ValidationService.isDocumentValid(data.document);
        if (documentError) errors.push(documentError);

        const passwordError = ValidationService.isRequired(data.password, 'Password') || ValidationService.isMinLength(data.password, 'Password', 8);
        if (passwordError) errors.push(passwordError);

        return errors;
    }

    async createUser(data: { name: string; document: string; password: string }) {
        const validationErrors = this.validateUserData(data);
        if (validationErrors.length > 0) {
            return Promise.reject(new ValidationError(validationErrors.join(' ')));
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.createUser({
            ...data,
            password: hashedPassword,
        });

        return user;
    }

    async getUserById(id: string) {
        return await this.userRepository.findById(id);
    }

    async updateUser(id: string, data: Partial<{ name: string; document: string; password: string }>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return await this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: string) {
        return await this.userRepository.deleteUser(id);
    }

    async listUsers() {
        return await this.userRepository.listUsers();
    }
}
