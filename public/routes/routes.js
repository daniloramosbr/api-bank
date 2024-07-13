"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../api/UserController"));
const ValorController_1 = __importDefault(require("../api/ValorController"));
const TransactionController_1 = __importDefault(require("../api/TransactionController"));
const routes = (0, express_1.Router)();
routes.post("/signup", UserController_1.default.create);
routes.post("/signin", UserController_1.default.valid);
routes.post("/googlesignin", UserController_1.default.googlevalid);
routes.get("/users/:id", UserController_1.default.all);
routes.patch("/edit/:id", ValorController_1.default.edit);
routes.patch("/send/:id", ValorController_1.default.send);
routes.get("/myvalor/:id", ValorController_1.default.myvalor);
routes.get("/transactions", TransactionController_1.default.get);
exports.default = routes;
