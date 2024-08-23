"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(request.body);
                return response.status(201).json(user);
            }
            catch (error) {
                console.error('Error creating user:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const user = yield this.userService.getUserById(id);
                if (!user) {
                    return response.status(404).json({ message: 'User not found' });
                }
                return response.status(200).json(user);
            }
            catch (error) {
                console.error('Error fetching user:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const user = yield this.userService.updateUser(id, request.body);
                return response.status(200).json(user);
            }
            catch (error) {
                console.error('Error updating user:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                yield this.userService.deleteUser(id);
                return response.status(204).send();
            }
            catch (error) {
                console.error('Error deleting user:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    listUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.listUsers();
                return response.status(200).json(users);
            }
            catch (error) {
                console.error('Error listing users:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;
