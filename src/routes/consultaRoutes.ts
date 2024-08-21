import { Router } from 'express';
import { ConsultaController } from '../controllers/ConsultaController';

const router = Router();
const consultaController = new ConsultaController();

router.post('/consultas', (req, res) => consultaController.registerConsulta(req, res));
router.get('/consultas/:id', (req, res) => consultaController.getConsulta(req, res));
router.put('/consultas/:id', (req, res) => consultaController.updateConsulta(req, res));
router.delete('/consultas/:id', (req, res) => consultaController.deleteConsulta(req, res));
router.get('/consultas', (req, res) => consultaController.listConsultas(req, res));

export default router;
