"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express = require('express');
const routes = require('./routes/routes');
const { configDotenv } = require('dotenv');
const { PrismaClient } = require("@prisma/client");
const database_1 = __importDefault(require("./database"));
const dotenv = configDotenv();
const app = express();
exports.prisma = new PrismaClient();
exports.prisma.$connect()
    .then(() => {
    console.log('conectado ao banco de dados!');
})
    .catch((error) => {
    console.error('Erro ao conectar com o Prisma:', error.message);
});
app.use(express.json());
(0, database_1.default)();
app.use(routes);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
