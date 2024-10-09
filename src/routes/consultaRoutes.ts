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

router.get('/consultas/medico/:medicoId', authenticateToken, (req, res) => consultaController.listConsultasByMedico(req, res));
router.post('/consultas/:id/laudo', (req, res) => consultaController.addLaudo(req, res));

router.get('/exame/:hash', (req, res) => consultaController.getResultadoExame(req, res));


export default router;
