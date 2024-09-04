import { Router } from 'express';
import { ConsultaController } from '../controllers/ConsultaController';
import { authenticateToken } from '../middlewares/authMiddleware';  // Importa o middleware

const router = Router();
const consultaController = new ConsultaController();

router.post('/consultas', authenticateToken, (req, res) => consultaController.registerConsulta(req, res));
router.get('/consultas/:id', authenticateToken, (req, res) => consultaController.getConsulta(req, res));
router.put('/consultas/:id', authenticateToken, (req, res) => consultaController.updateConsulta(req, res));
router.delete('/consultas/:id', authenticateToken, (req, res) => consultaController.deleteConsulta(req, res));
router.get('/consultas', authenticateToken, (req, res) => consultaController.listConsultas(req, res));

export default router;
