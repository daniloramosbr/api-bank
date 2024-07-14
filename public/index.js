"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express = require('express');
const routes = require('./routes/routes');
const { configDotenv } = require('dotenv');
const { PrismaClient } = require("@prisma/client");
const pg = require('pg');
const { Pool } = pg;
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
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    }
    else {
        console.log('Connected to the database!');
    }
});
app.use(routes);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
