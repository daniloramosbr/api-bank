import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class TransactionController {
  //  Retorna as últimas 3 transações cadastradas
  
  async get(request: Request, response: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: {
          createdAt: 'desc', // Ordena pela data de criação em ordem decrescente
        },
        take: 3,
      });
      
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).send(error);
    }
  }
}

export default new TransactionController()
