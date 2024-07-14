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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //cria usuario
            try {
                const { name, email, password } = request.body;
                if (!name || !email || !password) {
                    return response.status(500).json({ erro: "insira todos os dados" }); //verircia se temm todos os dados
                }
                const user = yield prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                //   if (data.rows.length >= 1) {
                //     return response.status(500).json({ erro: "email já cadastrado" });         //retorna erro
                //   }
                //   const passCrypt = await bcrypt.hash(password, 10);   //senha criptografada
                //   const {rows} = await pool.query(`INSERT INTO "user" (id, name, email, password) VALUES(gen_random_uuid(),'${name}','${email}','${passCrypt}') RETURNING *`) //cria user
                //   await pool.query(`INSERT INTO "valor" (name, user) VALUES('${name}','${rows[0].id}')`) //cria valor com id e name do user
                //   const data = Jwt.sign({ id: user.id, name: name }, "190526", {
                //     //cria token com id e name
                //     expiresIn: "24h",
                //   });
                response.status(201).json(user);
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
}
exports.default = new UserController();
