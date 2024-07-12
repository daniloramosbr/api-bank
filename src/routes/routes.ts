import { Router } from "express";
import UserController from "../controllers/UserController";
import ValorController from "../controllers/ValorController";
import TransactionController from "../controllers/TransactionController";

const routes = Router()

routes.post("/signup", UserController.create)
routes.post("/signin", UserController.valid)
routes.post("/googlesignin", UserController.googlevalid)
routes.get("/users/:id", UserController.all)
routes.patch("/edit/:id", ValorController.edit)
routes.patch("/send/:id", ValorController.send)
routes.get("/myvalor/:id", ValorController.myvalor)
routes.get("/transactions", TransactionController.get)

export default routes