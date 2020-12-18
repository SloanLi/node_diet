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
const authService = new user_1.default();
class UserController {
    constructor() {
        this.postUser = this.postUser.bind(this);
        this.getOpenId = this.getOpenId.bind(this);
        this.putUser = this.putUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    getOpenId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.query;
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
            try {
                const queryResult = yield user_2.default.find({ openId: userData.openId });
                if (queryResult.length === 0) {
                    const addUserData = new user_2.default(userData);
                    const data = yield addUserData.save();
                    res.send({
                        success: true, message: '创建成功', code: 200, data, error: {},
                    });
                }
                else {
                    res.send({
                        success: false, message: '重复数据，创建失败', code: 200, data: {}, error: {},
                    });
                }
            }
            catch (error) {
                res.send({
                    success: false, message: '创建失败', code: 200, data: {}, error,
                });
            }
        });
    }
    putUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            if (!userData._id) {
                res.send({
                    success: false, message: '修改失败', code: 200, data: {}, error: '_id不能为空',
                });
            }
            try {
                const updateResult = yield user_2.default.findOneAndUpdate({ _id: userData._id }, { $set: userData }, { upsert: true, new: true, useFindAndModify: false });
                res.send({
                    success: false, message: '修改成功', code: 200, data: updateResult,
                });
            }
            catch (error) {
                res.send({
                    success: false, message: '修改失败', code: 200, data: {},
                });
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.id;
            if (!userId) {
                res.send({
                    success: false, message: '查询失败', code: 200, data: {}, error: 'userId不能为空',
                });
            }
            try {
                const data = yield user_2.default.findOne({ _id: userId });
                res.send({
                    success: true, message: '查询成功', code: 200, data, error: {},
                });
            }
            catch (error) {
                res.send({
                    success: false, message: '查询失败', code: 200, data: {}, error,
                });
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.id;
            if (!userId) {
                res.send({
                    success: false, message: '修改失败', code: 200, data: {}, error: 'userId不能为空',
                });
            }
            try {
                const data = yield user_2.default.deleteOne({ userId });
                res.send({
                    success: true, message: '删除失败', code: 200, data, error: {},
                });
            }
            catch (error) {
                res.send({
                    success: false, message: '删除失败', code: 200, data: {}, error,
                });
            }
        });
    }
}
exports.default = UserController;
