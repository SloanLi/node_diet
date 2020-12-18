"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const diet_1 = __importDefault(require("./diet"));
exports.default = (app) => {
    app.use('/user', user_1.default);
    app.use('/diet', diet_1.default);
};
