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
exports.ConsultaController = void 0;
const ConsultaService_1 = require("../services/ConsultaService");
class ConsultaController {
    constructor() {
        this.consultaService = new ConsultaService_1.ConsultaService();
    }
    registerConsulta(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { medicoId, date } = request.body;
                const consulta = yield this.consultaService.registerConsulta({ medicoId, date });
                return response.status(201).json(consulta);
            }
            catch (error) {
                console.error('Error registering consulta:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.ConsultaController = ConsultaController;
