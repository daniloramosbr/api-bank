"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const database_1 = __importDefault(require("./database"));
const dotenv = (0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
// prisma.$connect()
//   .then(() => {
//     console.log('conectado ao banco de dados!');
//   })
//   .catch((error) => {
//     console.error('Erro ao conectar com o Prisma:', error.message);
//   })
app.use(express_1.default.json());
(0, database_1.default)();
app.options('*', (0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
