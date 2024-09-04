import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import {authenticateToken} from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.post('/users', authenticateToken, (req, res) => userController.create(req, res));
router.get('/users', authenticateToken, (req, res) => userController.listUsers(req, res));
router.get('/users/:id', authenticateToken, (req, res) => userController.getUser(req, res));
router.put('/users/:id', authenticateToken, (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', authenticateToken, (req, res) => userController.deleteUser(req, res));

export default router;
