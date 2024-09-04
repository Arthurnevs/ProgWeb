"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./config/server");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const medicoRoutes_1 = __importDefault(require("./routes/medicoRoutes"));
const consultaRoutes_1 = __importDefault(require("./routes/consultaRoutes"));
const app = (0, server_1.createServer)();
app.use('/api', userRoutes_1.default);
app.use('/api', authRoutes_1.default);
app.use('/api', medicoRoutes_1.default);
app.use('/api', consultaRoutes_1.default);
exports.default = app;
