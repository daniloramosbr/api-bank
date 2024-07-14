import { Router } from "express";

import TransactionController from "../api/TransactionController";

const routes = Router()


routes.get("/transactions", TransactionController.get)

export default routes