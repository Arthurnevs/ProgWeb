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
exports.ConsultaService = void 0;
const ConsultaRepository_1 = require("../repositories/ConsultaRepository");
const uuid_1 = require("uuid");
class ConsultaService {
    constructor() {
        this.consultaRepository = new ConsultaRepository_1.ConsultaRepository();
    }
    registerConsulta(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                hash: (0, uuid_1.v4)(),
                status: 'PENDING',
                laudo: '',
                medicoId: data.medicoId,
                dataConsulta: new Date(data.date),
            };
            return yield this.consultaRepository.createConsulta(payload);
        });
    }
}
exports.ConsultaService = ConsultaService;
