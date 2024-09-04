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
exports.ConsultaService = void 0;
const ConsultaRepository_1 = require("../repositories/ConsultaRepository");
const uuid_1 = require("uuid");
const ConsultaStatusEnum_1 = __importDefault(require("../enums/ConsultaStatusEnum"));
class ConsultaService {
    constructor() {
        this.consultaRepository = new ConsultaRepository_1.ConsultaRepository();
    }
    registerConsulta(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                hash: (0, uuid_1.v4)(),
                status: ConsultaStatusEnum_1.default.Pendente,
                laudo: '',
                medicoId: data.medicoId,
                dataConsulta: new Date(data.date),
            };
            return yield this.consultaRepository.createConsulta(payload);
        });
    }
    getConsultaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultaRepository.findById(id);
        });
    }
    updateConsulta(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultaRepository.updateConsulta(id, data);
        });
    }
    deleteConsulta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultaRepository.deleteConsulta(id);
        });
    }
    listConsultas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultaRepository.listConsultas();
        });
    }
}
exports.ConsultaService = ConsultaService;
