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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
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
                const token = jsonwebtoken_1.default.sign({ userId: user.id, document: user.document }, JWT_SECRET, { expiresIn: '1h' } // Token válido por 1 hora
                );
                return { success: true, token };
            }
            else {
                return { success: false };
            }
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                return !!decoded;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.AuthService = AuthService;
