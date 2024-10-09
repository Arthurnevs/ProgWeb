import { Request, Response } from 'express';
import { ConsultaService } from '../services/ConsultaService';

export class ConsultaController {
    private consultaService: ConsultaService;

    constructor() {
        this.consultaService = new ConsultaService();
    }

    async registerConsulta(request: Request, response: Response) {
        try {
            const { medicoId, date } = request.body;
            const consulta = await this.consultaService.registerConsulta({ medicoId, date });
            return response.status(201).json(consulta);
        } catch (error) {
            console.error('Error registering consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getConsulta(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const consulta = await this.consultaService.getConsultaById(id);

            if (!consulta) {
                return response.status(404).json({ message: 'Consulta not found' });
            }

            return response.status(200).json(consulta);
        } catch (error) {
            console.error('Error fetching consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateConsulta(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const updatedConsulta = await this.consultaService.updateConsulta(id, request.body);

            return response.status(200).json(updatedConsulta);
        } catch (error) {
            console.error('Error updating consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteConsulta(request: Request, response: Response) {
        try {
            const { id } = request.params;
            await this.consultaService.deleteConsulta(id);

            return response.status(204).send();
        } catch (error) {
            console.error('Error deleting consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async listConsultas(request: Request, response: Response) {
        try {
            const consultas = await this.consultaService.listConsultas();
            return response.status(200).json(consultas);
        } catch (error) {
            console.error('Error listing consultas:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async listConsultasByMedico(request: Request, response: Response) {
        try {
            const { medicoId } = request.params;
            const consultas = await this.consultaService.listConsultasByMedico(medicoId);

            if (consultas.length === 0) {
                return response.status(404).json({ message: 'No consultas found for this médico' });
            }

            return response.status(200).json(consultas);
        } catch (error) {
            console.error('Error listing consultas by médico:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Nova rota para adicionar o laudo de uma consulta
    async addLaudo(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { laudo } = request.body; // Supõe que o laudo é passado no corpo da requisição
            const updatedConsulta = await this.consultaService.addLaudo(id, laudo);

            if (!updatedConsulta) {
                return response.status(404).json({ message: 'Consulta not found' });
            }

            return response.status(200).json(updatedConsulta);
        } catch (error) {
            console.error('Error adding laudo to consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getResultadoExame(request: Request, response: Response) {
        try {
            const { hash } = request.params;
            const consulta = await this.consultaService.getResultExame(hash);

            if (!consulta) {
                return response.status(404).json({ message: 'Consulta not found' });
            }

            return response.status(200).json({
                consulta: consulta,
            });
        } catch (error) {
            console.error('Error fetching consulta:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
