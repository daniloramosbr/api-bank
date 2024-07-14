"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const dotenv_1 = require("dotenv");
const database_1 = __importDefault(require("./database"));
const dotenv = (0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, database_1.default)();
app.use(routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
