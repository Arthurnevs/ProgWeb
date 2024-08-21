import { Router } from 'express';
import { MedicoController } from '../controllers/MedicoController';

const router = Router();
const medicoController = new MedicoController();

router.post('/medicos', (req, res) => medicoController.registerDoctor(req, res));
router.get('/medicos/:id', (req, res) => medicoController.getDoctor(req, res));
router.put('/medicos/:id', (req, res) => medicoController.updateDoctor(req, res));
router.delete('/medicos/:id', (req, res) => medicoController.deleteDoctor(req, res));
router.get('/medicos', (req, res) => medicoController.listDoctors(req, res));

export default router;
