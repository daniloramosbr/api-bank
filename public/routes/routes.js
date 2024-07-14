"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("express").Router();
const TransactionController = require("../api/TransactionController");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
routes.get("/transactions", (equest, response) => {
    try {
        const transactions = prisma.transaction.findMany();
        response.status(200).json(transactions);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
module.exports = routes;
