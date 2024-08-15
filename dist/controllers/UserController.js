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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthController_1 = require("./AuthController");
class UserController {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
        this.authController = new AuthController_1.AuthController();
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, document, password } = request.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield this.prismaClient.user.create({
                data: {
                    name,
                    document,
                    password: hashedPassword
                }
            });
            return response.json(user);
        });
    }
    registerDoctor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, especialidade } = request.body;
            const doctor = yield this.prismaClient.medico.create({
                data: {
                    name: name,
                    especialidade: especialidade
                }
            });
            return response.json(doctor);
        });
    }
}
exports.UserController = UserController;
