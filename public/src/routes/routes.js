"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
// import ValorController from "../api/ValorController";
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const routes = (0, express_1.Router)();
routes.post("/signup", UserController_1.default.create);
// routes.post("/signin", UserController.valid)
// routes.post("/googlesignin", UserController.googlevalid)
// routes.get("/users/:id", UserController.all)
// routes.patch("/edit/:id", ValorController.edit)
// routes.patch("/send/:id", ValorController.send)
// routes.get("/myvalor/:id", ValorController.myvalor)
routes.get("/transactions", TransactionController_1.default.get);
exports.default = routes;
