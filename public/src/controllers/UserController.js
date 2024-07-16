"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = request.body;
                if (!name || !email) {
                    return response.status(500).json({ erro: "insira todos os dados" }); //verircia se temm todos os dados
                }
                const user = yield prisma.user.findUnique({
                    where: {
                        email
                    },
                });
                if (user != null) {
                    return response.status(500).json({ erro: "email já cadastrado" }); //retorna erro
                }
                const passCrypt = yield bcrypt_1.default.hash(password, 10); //senha criptografada
                const newUser = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        password: passCrypt,
                    },
                });
                yield prisma.valor.create({
                    data: {
                        name,
                        user: newUser.id
                    },
                });
                const data = jsonwebtoken_1.default.sign({ id: newUser.id, name: name }, "190526", {
                    //cria token com id e name
                    expiresIn: "24h",
                });
                response.status(201).json({ data });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
    valid(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //valida user
            try {
                const { email, password } = request.body;
                const user = yield prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return response.status(401).json({ erro: "Usuário não encontrado" });
                }
                const hash = yield prisma.user.findUnique({
                    where: { email: email },
                    select: { password: true },
                });
                if (hash == null) {
                    return response.status(404).send({
                        message: "usuário ou senha incorretos",
                    });
                }
                const validPassword = yield bcrypt_1.default.compare(password, hash.password); //verifica se a senha eh igual
                if (!validPassword) {
                    return response.status(401).json({ erro: "Senha inválida" });
                }
                const data = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, "190526", {
                    expiresIn: "24h",
                });
                response.json({ data });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
    googlevalid(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //valida google
            try {
                const { email } = request.body;
                const user = yield prisma.user.findUnique({ where: { email } }); //busca no banco
                if (!user) {
                    return response.status(401).json({ erro: "Usuário não encontrado" });
                }
                const data = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, "190526", {
                    expiresIn: "24h",
                });
                response.json({ data });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
    all(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //busca todos users
            try {
                const user = request.params.id;
                const data = yield prisma.user.findMany({
                    where: {
                        NOT: {
                            id: user, //remove o com id informado
                        },
                    },
                    select: { id: true,
                        name: true,
                    }
                });
                response.status(200).json({ data });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
}
exports.default = new UserController();
