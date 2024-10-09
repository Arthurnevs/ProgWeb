import { ConsultaRepository } from '../repositories/ConsultaRepository';
import { v4 as uuidv4 } from 'uuid';
import ConsultaStatus from "../enums/ConsultaStatusEnum";

export class ConsultaService {
    private consultaRepository: ConsultaRepository;

    constructor() {
        this.consultaRepository = new ConsultaRepository();
    }

    async registerConsulta(data: { medicoId: string; date: string }) {
        const payload = {
            hash: uuidv4(),
            status: ConsultaStatus.Pendente,
            laudo: '',
            medicoId: data.medicoId,
            dataConsulta: new Date(data.date),
        };

        return await this.consultaRepository.createConsulta(payload);
    }

    async getConsultaById(id: string) {
        return await this.consultaRepository.findById(id);
    }

    async updateConsulta(id: string, data: Partial<{ status: string; laudo: string; medicoId: string;}>) {
        return await this.consultaRepository.updateConsulta(id, data);
    }

    async deleteConsulta(id: string) {
        return await this.consultaRepository.deleteConsulta(id);
    }

    async listConsultas() {
        return await this.consultaRepository.listConsultas();
    }

    async listConsultasByMedico(medicoId: string) {
        return await this.consultaRepository.listConsultasByMedico(medicoId);
    }
    async addLaudo(id: string, laudo: string) {
        return await this.consultaRepository.addLaudo(id, laudo);
    }

    async getResultExame(hash: string) {
        return await this.consultaRepository.getResultExame(hash);
    }


}
