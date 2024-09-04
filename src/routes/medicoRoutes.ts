import { Router } from 'express';
import { MedicoController } from '../controllers/MedicoController';
import {authenticateToken} from "../middlewares/authMiddleware";

const router = Router();
const medicoController = new MedicoController();

router.post('/medicos', authenticateToken, (req, res) => medicoController.registerDoctor(req, res));
router.get('/medicos/:id', authenticateToken, (req, res) => medicoController.getDoctor(req, res));
router.put('/medicos/:id', authenticateToken, (req, res) => medicoController.updateDoctor(req, res));
router.delete('/medicos/:id', authenticateToken, (req, res) => medicoController.deleteDoctor(req, res));
router.get('/medicos', authenticateToken, (req, res) => medicoController.listDoctors(req, res));

export default router;
