"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const router = express_1.default.Router();
const user = new user_1.default();
router.get('/getOpenId', user.getOpenId);
router.post('/user', user.postUser);
exports.default = router;
