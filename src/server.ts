import { UserController } from './controllers/UserController';
import express, { Request, Response } from 'express';
import {AuthController} from "./controllers/AuthController";


const app = express();
const port = 3000;


app.use(express.json());

const userController = new UserController();
const authController = new AuthController()

app.post('/user/create', (req, res) => userController.create(req, res));


app.post('/user/create/doctor', authController.validateToken.bind(authController), (req, res) => userController.registerDoctor(req, res))

app.post('/user/login', (req, res) => authController.login(req, res))

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// https://github.com/joseglauberbo/ProgWeb