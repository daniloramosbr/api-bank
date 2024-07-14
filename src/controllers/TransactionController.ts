import { Request, Response } from "express";
import pool from "../../database";

class TransactionController {
  async get(request: Request, response: Response) {
    try {
      const data = await pool.query(
        "SELECT * FROM Transaction ORDER BY DESC LIMIT 3"
      );

      response.status(200).json({ data });
    } catch (error) {
      response.status(500).send(error);
    }
  }
}

export default new TransactionController();
