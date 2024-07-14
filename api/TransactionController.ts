const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express"; 
const prisma = new PrismaClient();


class TransactionController {
  async get(request: Request, response: Response) {
    try {
      const transactions = await prisma.transaction.findMany(); 
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).send(error);
    }
  }
}


export default new TransactionController();
