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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
class AuthService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    login(document, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaClient.user.findUnique({
                where: { document },
            });
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                const token = (0, uuid_1.v4)();
                yield this.prismaClient.session.create({
                    data: {
                        token,
                        userId: user.id,
                        expiresAt: new Date(Date.now() + 3600 * 1000), // Token válido por 1 hora
                    },
                });
                return { success: true, token };
            }
            else {
                return { success: false };
            }
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                return false;
            }
            const session = yield this.prismaClient.session.findUnique({
                where: { token },
            });
            return session && session.expiresAt > new Date();
        });
    }
}
exports.AuthService = AuthService;
