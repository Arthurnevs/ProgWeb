import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/users', (req, res) => userController.create(req, res));
router.get('/users', (req, res) => userController.listUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUser(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

export default router;
