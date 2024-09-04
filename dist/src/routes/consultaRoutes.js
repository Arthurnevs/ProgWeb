"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ConsultaController_1 = require("../controllers/ConsultaController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Importa o middleware
const router = (0, express_1.Router)();
const consultaController = new ConsultaController_1.ConsultaController();
router.post('/consultas', authMiddleware_1.authenticateToken, (req, res) => consultaController.registerConsulta(req, res));
router.get('/consultas/:id', authMiddleware_1.authenticateToken, (req, res) => consultaController.getConsulta(req, res));
router.put('/consultas/:id', authMiddleware_1.authenticateToken, (req, res) => consultaController.updateConsulta(req, res));
router.delete('/consultas/:id', authMiddleware_1.authenticateToken, (req, res) => consultaController.deleteConsulta(req, res));
router.get('/consultas', authMiddleware_1.authenticateToken, (req, res) => consultaController.listConsultas(req, res));
exports.default = router;
