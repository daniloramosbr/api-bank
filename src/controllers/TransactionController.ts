import { Request, Response } from "express";
// import pool from "../../database";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TransactionController {
  async get(request: Request, response: Response) {

    // try {
    //   const {rows} = await pool.query(
    //     "SELECT * FROM transaction"
    //   );

    //   response.status(200).json(rows);
    // } catch (error) {
    //   response.status(500).send(error);
    // }


    try {
      const transactions = await prisma.transaction.findMany();
      response.status(200).json(transactions)
    } catch (error) {
      response.status(500).send(error)
    }



  }
}

export default new TransactionController()
