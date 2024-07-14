import express from 'express'
import routes from './routes/routes';
import { configDotenv } from 'dotenv';
import Cors from 'cors'
import { PrismaClient } from "@prisma/client"
import ConnectDb from './database';

const dotenv = configDotenv()

const app = express();


export const prisma = new PrismaClient()

// prisma.$connect()
//   .then(() => {
//     console.log('conectado ao banco de dados!');
//   })
//   .catch((error) => {
//     console.error('Erro ao conectar com o Prisma:', error.message);
//   })

app.use(express.json());

ConnectDb()

app.options('*', Cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(routes)
app.listen(1905, () => {
  console.log('Servidor rodando na porta 3000')
})