"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const TransactionController_1 = __importDefault(require("../api/TransactionController"));
const routes = Router();
routes.get("/transactions", TransactionController_1.default.get);
exports.default = routes;
