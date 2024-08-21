"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import authRoutes from './routes/authRoutes';
// import medicoRoutes from './routes/medicoRoutes';
// import consultaRoutes from './routes/consultaRoutes';
const app = (0, server_1.createServer)();
// Configurando rotas
app.use('/api', userRoutes_1.default);
// app.use('/api', authRoutes);
// app.use('/api', medicoRoutes);
// app.use('/api', consultaRoutes);
exports.default = app;
