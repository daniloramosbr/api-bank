import express from 'express'
import routes from './routes/routes';
import { configDotenv } from 'dotenv';
import { PrismaClient } from "@prisma/client"
import pg from 'pg';

const { Pool } = pg;

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

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err)=>{

    if (err) {
        console.error('Error connecting to the database:', err.stack)
    } else {
        console.log('Connected to the database!')
    }

})

app.use(routes)
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})