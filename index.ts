import express from 'express'
import routes from './src/routes/routes';
import { configDotenv } from 'dotenv';
const dotenv = configDotenv()

const app = express();

app.use(express.json());

app.use(routes)
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})