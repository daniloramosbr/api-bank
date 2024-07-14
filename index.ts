import express from 'express'
import routes from './routes/routes';
import { configDotenv } from 'dotenv';
import ConnectDb from './database';

const dotenv = configDotenv()

const app = express();

app.use(express.json());

ConnectDb()

app.use(routes)
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})