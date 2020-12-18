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
const diet_1 = __importDefault(require("../model/diet"));
class DietController {
    constructor() {
        this.getDiet = this.getDiet.bind(this);
        this.postDiet = this.postDiet.bind(this);
        this.putDiet = this.putDiet.bind(this);
        this.deleteDiet = this.deleteDiet.bind(this);
    }
    getDiet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.userId;
            if (!id) {
                res.send({ success: false, message: '查询失败', code: 200, data: {}, error: { message: '用户ID不能为空' } });
            }
            try {
                const data = yield diet_1.default.find({ userId: id });
                res.send({ success: true, message: '成功', code: 200, data, error: {} });
            }
            catch (error) {
                res.send({ success: false, message: '失败', code: 200, data: {}, error });
            }
        });
    }
    postDiet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (!body.userId) {
                res.send({ success: false, message: '添加失败，用户ID缺失', code: 200, data: {}, error: {} });
            }
            try {
                const data = yield new diet_1.default(body).save();
                res.send({ success: true, message: '添加成功', code: 200, data, error: {} });
            }
            catch (error) {
                res.send({ success: false, message: '添加失败', code: 200, data: {}, error });
            }
        });
    }
    putDiet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (!body._id) {
                res.send({ success: false, message: '修改失败', code: 200, data: {}, error: 'Id不能为空' });
            }
            try {
                const data = yield diet_1.default.findOneAndUpdate({ _id: body._id }, { $set: body }, { upsert: true, new: true, useFindAndModify: false });
                res.send({ success: false, message: "修改成功", code: 200, data });
            }
            catch (error) {
                res.send({ success: false, message: "修改失败", code: 200, data: {} });
            }
        });
    }
    deleteDiet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            if (!id) {
                res.send({ success: false, message: '修改失败', code: 200, data: {}, error: 'id不能为空' });
            }
            try {
                const data = yield diet_1.default.deleteOne({ _id: id });
                res.send({ success: true, message: '删除成功', code: 200, data, error: {} });
            }
            catch (error) {
                res.send({ success: false, message: '删除失败', code: 200, data: {}, error });
            }
        });
    }
}
exports.default = DietController;
