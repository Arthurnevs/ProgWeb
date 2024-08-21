import { Request, Response } from 'express';
import { MedicoService } from '../services/MedicoService';

export class MedicoController {
    private medicoService: MedicoService;

    constructor() {
        this.medicoService = new MedicoService();
    }

    async registerDoctor(request: Request, response: Response) {
        try {
            const { name, especialidade } = request.body;
            const doctor = await this.medicoService.registerDoctor({ name, especialidade });
            return response.status(201).json(doctor);
        } catch (error) {
            console.error('Error registering doctor:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getDoctor(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const doctor = await this.medicoService.getDoctorById(id);

            if (!doctor) {
                return response.status(404).json({ message: 'Doctor not found' });
            }

            return response.status(200).json(doctor);
        } catch (error) {
            console.error('Error fetching doctor:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateDoctor(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const updatedDoctor = await this.medicoService.updateDoctor(id, request.body);

            return response.status(200).json(updatedDoctor);
        } catch (error) {
            console.error('Error updating doctor:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteDoctor(request: Request, response: Response) {
        try {
            const { id } = request.params;
            await this.medicoService.deleteDoctor(id);

            return response.status(204).send();
        } catch (error) {
            console.error('Error deleting doctor:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async listDoctors(request: Request, response: Response) {
        try {
            const doctors = await this.medicoService.listDoctors();
            return response.status(200).json(doctors);
        } catch (error) {
            console.error('Error listing doctors:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
