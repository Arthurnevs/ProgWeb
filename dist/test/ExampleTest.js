"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Caminho para o arquivo onde o servidor é inicializado
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
chai.use(chaiHttp);
const { expect } = chai;
(0, node_test_1.describe)('POST /users', () => {
    (0, node_test_1.it)('deve criar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'John Doe',
            document: '12345678901',
            password: 'password123',
        };
        const hashedPassword = yield bcrypt.hash(userData.password, 10);
        sinon.stub(bcrypt, 'hash').resolves(hashedPassword);
        const createUserStub = sinon.stub(prismaClient.user, 'create').resolves({
            id: 1,
            name: userData.name,
            document: userData.document,
            password: hashedPassword,
        });
        const res = yield chai.request(app).post('/users').send(userData);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name', userData.name);
        expect(res.body).to.have.property('document', userData.document);
        expect(res.body).to.have.property('password', hashedPassword);
        bcrypt.hash.restore();
        createUserStub.restore();
    }));
    (0, node_test_1.it)('deve retornar um erro ao falhar na criação do usuário', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'John Doe',
            document: '12345678901',
            password: 'password123',
        };
        sinon.stub(bcrypt, 'hash').rejects(new Error('Hashing failed'));
        const res = yield chai.request(app).post('/users').send(userData);
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Internal Server Error');
        bcrypt.hash.restore();
    }));
});
