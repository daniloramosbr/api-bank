import { prisma } from "../database/connect";
import { Request, Response } from "express";

class ValorController {
  async edit(request: Request, response: Response) {
    try {
      const user = request.params.id; // Pega o ID do usuário na URL
      const { valor } = request.body;

      await prisma.valor.update({
        where: { user },
        data: { valor }, // Atualiza o valor do usuário
      });

      response.status(200).json({ message: "editado com sucesso!" });
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async send(request: Request, response: Response) {
    try {
      const id = request.params.id; //id de quem vai enviar

      const { user, valor } = request.body;

      if (valor === 0) {
        return response
          .status(500)
          .json({ erro: "impossivel enviar 0 como valor" });
      }

      const userToSend: any = await prisma.valor.findUnique({
        //valor do send
        where: { user: id },
      });

      if (userToSend.valor < valor) {
        return response.status(500).json({ erro: "saldo insuficiente!" });
      }

      const userToReceived: any = await prisma.valor.findUnique({
        //valor do received
        where: { user: user },
      });

      const newValorSend = (userToSend.valor -= valor); //subtraindo do send
      const newValorReceived = (userToReceived.valor += valor); //somando com o valor

      await prisma.valor.update({        //atualiza valor de que enviou
      
        where: { user: id },
        data: { valor: newValorSend },
      });

      await prisma.valor.update({         //atualiza valor de quem recebeu
        where: { user },
        data: { valor: newValorReceived },
      });

      await prisma.transaction.create({                 //cria a transação
        data: { send: userToSend.name, received: userToReceived.name, valor },
      });

      response.status(201).json({ message: "enviado com sucesso!" });
    } catch (error) {
      response.status(500).send(error);
    }
  }
  async myvalor(request: Request, response: Response) {
    try {
      const user = request.params.id; //id do user

      const data = await prisma.valor.findUnique({
        //valor do user
        where: { user },
        select: { name: true, user: true, valor: true },
      });

      response.status(200).json({ data });
    } catch (error) {
      response.status(500).send(error);
    }
  }
}

export default new ValorController();
