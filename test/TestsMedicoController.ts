// import { describe, it, before, after } from 'node:test';
// import axios from 'axios';
// import { expect } from 'chai';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// describe('MedicoController Tests', () => {
//     let adminUserData: { document: string; password: string };
//     let adminToken: string;
//     let testDoctorId: string;
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
//         const testDoctor = await prisma.medico.create({
//             data: {
//                 name: 'Test Doctor',
//                 especialidade: 'Cardiologia',
//             },
//         });
//
//         testDoctorId = testDoctor.id;
//     });
//
//     after(async () => {
//         await prisma.user.delete({
//             where: { document: adminUserData.document },
//         });
//
//         if (testDoctorId) {
//             await prisma.medico.delete({
//                 where: { id: testDoctorId },
//             });
//         }
//     });
//
//     it('Deve registrar um médico com sucesso', async () => {
//         const response = await axios.post(
//             'http://localhost:3000/doctors',
//             {
//                 name: 'New Doctor',
//                 especialidade: 'Neurologia',
//             },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(201);
//         expect(response.data).to.have.property('id');
//     });
//
//     it('Deve buscar o médico de teste pelo ID', async () => {
//         const response = await axios.get(`http://localhost:3000/doctors/${testDoctorId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data.name).to.equal('Test Doctor');
//     });
//
//     it('Deve atualizar o médico de teste com sucesso', async () => {
//         const response = await axios.put(
//             `http://localhost:3000/doctors/${testDoctorId}`,
//             { name: 'Updated Test Doctor' },
//             { headers: { Authorization: `Bearer ${adminToken}` } }
//         );
//
//         expect(response.status).to.equal(200);
//         expect(response.data.name).to.equal('Updated Test Doctor');
//     });
//
//     it('Deve listar todos os médicos', async () => {
//         const response = await axios.get('http://localhost:3000/doctors', {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(200);
//         expect(response.data).to.be.an('array');
//     });
//
//     it('Deve deletar o médico de teste com sucesso', async () => {
//         const response = await axios.delete(`http://localhost:3000/doctors/${testDoctorId}`, {
//             headers: { Authorization: `Bearer ${adminToken}` },
//         });
//
//         expect(response.status).to.equal(204);
//     });
// });
