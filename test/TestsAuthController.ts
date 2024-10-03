// import { describe, it, before, after } from 'node:test';
// import axios from 'axios';
// import { expect } from 'chai';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// describe('AuthController Tests', () => {
//     let userData: { document: string; password: string };
//     let token: string;
//
//     before(async () => {
//         const hashedPassword = await bcrypt.hash('password123', 10);
//
//         const user = await prisma.user.create({
//             data: {
//                 document: '12345678900',
//                 password: hashedPassword,
//                 name: 'Test User',
//             },
//         });
//
//         userData = { document: user.document, password: 'password123' };
//     });
//
//     after(async () => {
//         await prisma.user.delete({
//             where: { document: userData.document },
//         });
//     });
//
//     it('Deve realizar login com sucesso', async () => {
//         const response = await axios.post('http://localhost:3000/login', {
//             document: userData.document,
//             password: userData.password,
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data).to.have.property('token');
//         token = response.data.token; // Armazenamos o token para os próximos testes
//     });
//
//     it('Deve falhar ao realizar login com credenciais incorretas', async () => {
//         try {
//             await axios.post('http://localhost:3000/login', {
//                 document: userData.document,
//                 password: 'wrongpassword',
//             });
//         } catch (error) {
//             expect(error.response.status).to.equal(401);
//             expect(error.response.data.message).to.equal('Invalid credentials');
//         }
//     });
//
//     it('Deve validar o token corretamente', async () => {
//         const response = await axios.get('http://localhost:3000/protected-route', {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//
//         expect(response.status).to.equal(200);
//     });
//
//     it('Deve retornar erro ao validar token inválido ou expirado', async () => {
//         try {
//             await axios.get('http://localhost:3000/protected-route', {
//                 headers: { Authorization: `Bearer invalidtoken` },
//             });
//         } catch (error) {
//             expect(error.response.status).to.equal(401);
//             expect(error.response.data.message).to.equal('Invalid or expired token');
//         }
//     });
// });
