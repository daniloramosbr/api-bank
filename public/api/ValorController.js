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
const __1 = require("..");
class ValorController {
    edit(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.params.id; // Pega o ID do usuário na URL
                const { valor } = request.body;
                yield __1.prisma.valor.update({
                    where: { user },
                    data: { valor }, // Atualiza o valor do usuário
                });
                response.status(200).json({ message: "editado com sucesso!" });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
    send(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id; //id de quem vai enviar
                const { user, valor } = request.body;
                if (valor === 0) {
                    return response
                        .status(500)
                        .json({ erro: "impossivel enviar 0 como valor" });
                }
                const userToSend = yield __1.prisma.valor.findUnique({
                    //valor do send
                    where: { user: id },
                });
                if (userToSend.valor < valor) {
                    return response.status(500).json({ erro: "saldo insuficiente!" });
                }
                const userToReceived = yield __1.prisma.valor.findUnique({
                    //valor do received
                    where: { user: user },
                });
                const newValorSend = (userToSend.valor -= valor); //subtraindo do send
                const newValorReceived = (userToReceived.valor += valor); //somando com o valor
                yield __1.prisma.valor.update({
                    where: { user: id },
                    data: { valor: newValorSend },
                });
                yield __1.prisma.valor.update({
                    where: { user },
                    data: { valor: newValorReceived },
                });
                yield __1.prisma.transaction.create({
                    data: { send: userToSend.name, received: userToReceived.name, valor },
                });
                response.status(201).json({ message: "enviado com sucesso!" });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
    myvalor(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.params.id; //id do user
                const data = yield __1.prisma.valor.findUnique({
                    //valor do user
                    where: { user },
                    select: { name: true, user: true, valor: true },
                });
                response.status(200).json({ data });
            }
            catch (error) {
                response.status(500).send(error);
            }
        });
    }
}
exports.default = new ValorController();
