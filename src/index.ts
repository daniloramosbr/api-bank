import express from 'express'
import routes from './routes/routes';
import { configDotenv } from 'dotenv';
import Cors from 'cors'

const dotenv = configDotenv()

const app = express();

app.use(express.json());

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
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})