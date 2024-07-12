"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const dotenv = (0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.options('*', (0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(routes_1.default);
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
