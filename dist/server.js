"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controllers/UserController");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const createUsers = new UserController_1.CreateUserController();
app.post('/user/create', createUsers.handle);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// let users: { id: number, name: string, document: string }[] = [
//   { id: 1, name: 'Arthur', document: "12147635456" },
//   { id: 2, name: 'Andre', document: "27262260430" },
//   { id: 3, name: 'Carlos', document: "93244564432" },
// ];
// app.get('/users', (req: Request, res: Response) => {
//   res.json(users);
// });
// app.get('/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const user = users.find(user => user.id === id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });
// app.post('/register', (req: Request, res: Response) => {
//   const new_user = {
//     id: users.length + 1,
//     name: req.body.name,
//     document: req.body.document
//   };
//   users.push(new_user);
//   res.status(201).json(new_user);
// });
// app.put('/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   const userIndex = users.findIndex(user => user.id === id);
//   if (userIndex !== -1) {
//     users[userIndex] = {
//       id: id,
//       name: req.body.nome,
//       document: users[userIndex].document
//     };
//     res.json(users[userIndex]);
//   } else {
//     res.status(404).send('User not found');
//   }
// });
// app.delete('/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   users = users.filter(user => user.id !== id);
//   res.status(204).send();
// });
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
// https://github.com/joseglauberbo/ProgWeb
