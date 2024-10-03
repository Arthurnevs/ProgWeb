// import { describe, it, before, after } from 'node:test';
// import axios from 'axios';
// import { expect } from 'chai';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// describe('ConsultaController Tests', () => {
//     let adminUserData: { document: string; password: string };
//     let adminToken: string;
//     let testConsultaId: string;
//     let testMedicoId: string;
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
//
//         const testMedico = await prisma.medico.create({
//             data: {
//                 name: 'Test Medico',
//                 especialidade: 'Cardiologia',
//             },
//         });
//
//         testMedicoId = testMedico.id;
//
//         const testConsulta = await prisma.consulta.create({
//             data: {
//                 hash: 'test-hash',
//                 status: 'Pendente',
//                 laudo: '',
//                 medicoId: testMedicoId,
//                 dataConsulta: new Date(),
//             },
//         });
//
//         testConsultaId = testConsulta.id;
//     });
//
//     after(async () => {
//         await prisma.user.delete({
//             where: { document: adminUserData.document },
//         });
//
//         if (testMedicoId) {
//             await prisma.medico.delete({
//                 where: { id: testMedicoId },
//             });
//         }
//
//         if (testConsultaId) {
//             await prisma.consulta.delete({
//                 where: { id: testConsultaId },
//             });
//         }
//     });
//
//     it('Deve registrar uma consulta com sucesso', async () => {
//         const response = await axios.post(
//             'http://localhost:3000/consultas',
//             {
//                 medicoId: testMedicoId,
//                 date: new Date().toISOString(),
//             },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(201);
//         expect(response.data).to.have.property('id');
//         expect(response.data.status).to.equal('Pendente');
//     });
//
//     it('Deve buscar a consulta de teste pelo ID', async () => {
//         const response = await axios.get(`http://localhost:3000/consultas/${testConsultaId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data.status).to.equal('Pendente');
//     });
//
//     it('Deve atualizar a consulta de teste com sucesso', async () => {
//         const response = await axios.put(
//             `http://localhost:3000/consultas/${testConsultaId}`,
//             { status: 'Finalizada', laudo: 'Laudo atualizado' },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(200);
//         expect(response.data.status).to.equal('Finalizada');
//         expect(response.data.laudo).to.equal('Laudo atualizado');
//     });
//
//     it('Deve listar todas as consultas', async () => {
//         const response = await axios.get('http://localhost:3000/consultas', {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data).to.be.an('array');
//     });
//
//     it('Deve deletar a consulta de teste com sucesso', async () => {
//         const response = await axios.delete(`http://localhost:3000/consultas/${testConsultaId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(204);
//     });
// });
