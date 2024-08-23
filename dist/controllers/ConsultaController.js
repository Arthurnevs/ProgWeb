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
    getConsulta(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const consulta = yield this.consultaService.getConsultaById(id);
                if (!consulta) {
                    return response.status(404).json({ message: 'Consulta not found' });
                }
                return response.status(200).json(consulta);
            }
            catch (error) {
                console.error('Error fetching consulta:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateConsulta(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const updatedConsulta = yield this.consultaService.updateConsulta(id, request.body);
                return response.status(200).json(updatedConsulta);
            }
            catch (error) {
                console.error('Error updating consulta:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    deleteConsulta(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                yield this.consultaService.deleteConsulta(id);
                return response.status(204).send();
            }
            catch (error) {
                console.error('Error deleting consulta:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    listConsultas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consultas = yield this.consultaService.listConsultas();
                return response.status(200).json(consultas);
            }
            catch (error) {
                console.error('Error listing consultas:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.ConsultaController = ConsultaController;
