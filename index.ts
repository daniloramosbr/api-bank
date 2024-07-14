const express = require('express');
const routes = require('./routes/routes');
const { configDotenv } = require('dotenv');
const { PrismaClient } = require("@prisma/client");
const {connectdb} = require('connectdb');

const dotenv = configDotenv()

const app = express();

export const prisma = new PrismaClient()

prisma.$connect()
  .then(() => {
    console.log('conectado ao banco de dados!');
  })
  .catch((error: any) => {
    console.error('Erro ao conectar com o Prisma:', error.message);
  })

app.use(express.json());

connectdb()

app.use(routes)
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})