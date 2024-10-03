// import { describe, it, before, after } from 'node:test';
// import axios from 'axios';
// import { expect } from 'chai';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// describe('UserController Tests', () => {
//     let adminUserData: { document: string; password: string };
//     let adminToken: string;
//     let testUserId: string;
//
//     before(async () => {
//         const hashedPassword = await bcrypt.hash('adminpassword', 10);
//
//         const adminUser = await prisma.user.create({
//             data: {
//                 document: 'admin12345678900',
//                 password: hashedPassword,
//                 name: 'Admin User',
//             },
//         });
//
//         adminUserData = { document: adminUser.document, password: 'adminpassword' };
//
//         const response = await axios.post('http://localhost:3000/login', {
//             document: adminUserData.document,
//             password: adminUserData.password,
//         });
//
//         adminToken = response.data.token;
//     });
//
//     after(async () => {
//         await prisma.user.delete({
//             where: { document: adminUserData.document },
//         });
//
//         if (testUserId) {
//             await prisma.user.delete({
//                 where: { id: testUserId },
//             });
//         }
//     });
//
//     it('Deve criar um usuário com sucesso', async () => {
//         const response = await axios.post(
//             'http://localhost:3000/users',
//             {
//                 name: 'Test User',
//                 document: '12345678911',
//                 password: 'password123',
//             },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(201);
//         expect(response.data).to.have.property('id');
//         testUserId = response.data.id;
//     });
//
//     it('Deve buscar um usuário pelo ID', async () => {
//         const response = await axios.get(`http://localhost:3000/users/${testUserId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data.name).to.equal('Test User');
//     });
//
//     it('Deve atualizar um usuário com sucesso', async () => {
//         const response = await axios.put(
//             `http://localhost:3000/users/${testUserId}`,
//             { name: 'Updated User' },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(200);
//         expect(response.data.name).to.equal('Updated User');
//     });
//
//     it('Deve listar todos os usuários', async () => {
//         const response = await axios.get('http://localhost:3000/users', {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data).to.be.an('array');
//     });
//
//     it('Deve deletar um usuário com sucesso', async () => {
//         const response = await axios.delete(`http://localhost:3000/users/${testUserId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(204);
//     });
// });
