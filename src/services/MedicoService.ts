import { MedicoRepository } from '../repositories/MedicoRepository';

export class MedicoService {
    private medicoRepository: MedicoRepository;

    constructor() {
        this.medicoRepository = new MedicoRepository();
    }

    async registerDoctor(data: { name: string; especialidade: string }) {
        return await this.medicoRepository.createMedico(data);
    }

    async getDoctorById(id: string) {
        return await this.medicoRepository.findById(id);
    }

    async updateDoctor(id: string, data: Partial<{ name: string; especialidade: string }>) {
        return await this.medicoRepository.updateMedico(id, data);
    }

    async deleteDoctor(id: string) {
        return await this.medicoRepository.deleteMedico(id);
    }

    async listDoctors() {
        return await this.medicoRepository.listMedicos();
    }
}
