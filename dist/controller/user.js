"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../service/user"));
const user_2 = __importDefault(require("../model/user"));
const mongoose = require('mongoose');
var querystring = require('querystring');
const authService = new user_1.default();
const user = mongoose.model('user', user_2.default);
class UserController {
    constructor() {
        this.queryUser = this.queryUser.bind(this);
        this.postUser = this.postUser.bind(this);
        this.getOpenId = this.getOpenId.bind(this);
    }
    getOpenId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.query.code;
            try {
                const data = yield authService.getOpenID(code);
                res.send(data);
            }
            catch (err) {
                res.send(err);
            }
        });
    }
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            if (!userData.userId) {
                userData.userId = (Math.random() * 100000).toFixed(0);
            }
            try {
                const queryResult = yield this.queryUser({ userName: userData.userName });
                if (queryResult.length < 0) {
                    const addUserData = new user(userData);
                    addUserData.save(function (err, data) {
                        if (err) {
                            res.send({ success: false, message: '创建失败', code: 200, data: {}, error: err });
                        }
                        res.send({ success: true, message: '创建成功', code: 200, data, error: {} });
                    });
                }
                else {
                    res.send({ success: false, message: '重复数据，创建失败', code: 200, data: {}, error: {} });
                }
            }
            catch (error) {
                console.log(error);
                res.send({ success: false, message: '创建失败', code: 200, data: {} });
            }
        });
    }
    queryUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user.findOne(data);
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = UserController;
