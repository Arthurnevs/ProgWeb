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
exports.MedicoController = void 0;
const MedicoService_1 = require("../services/MedicoService");
class MedicoController {
    constructor() {
        this.medicoService = new MedicoService_1.MedicoService();
    }
    registerDoctor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, especialidade } = request.body;
                const doctor = yield this.medicoService.registerDoctor({ name, especialidade });
                return response.status(201).json(doctor);
            }
            catch (error) {
                console.error('Error registering doctor:', error);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.MedicoController = MedicoController;
