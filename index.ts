import express from 'express'
import routes from './routes/routes';
import { configDotenv } from 'dotenv';
import { PrismaClient } from "@prisma/client"
import ConnectDb from './database';

const dotenv = configDotenv()

const app = express();

export const prisma = new PrismaClient()

prisma.$connect()
  .then(() => {
    console.log('conectado ao banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o Prisma:', error.message);
  })

app.use(express.json());

ConnectDb()

app.use(routes)
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})