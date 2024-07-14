import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class TransactionController {
  async get(request: Request, response: Response) {

    try {
      const transactions = await prisma.transaction.findMany();
      response.status(200).json(transactions)
    } catch (error) {
      response.status(500).send(error)
    }
  }
}

export default new TransactionController()
