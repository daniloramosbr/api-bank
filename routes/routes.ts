const routes = require("express").Router();
const TransactionController = require("../api/TransactionController");
const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express"; 
const prisma = new PrismaClient();


routes.get("/transactions", (equest: Request, response: Response) => {
    try {
      const transactions = prisma.transaction.findMany(); 
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = routes;
