"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diet_1 = __importDefault(require("../controller/diet"));
const router = express_1.default.Router();
const diet = new diet_1.default();
router.post('/post', diet.postDiet);
router.put('/put', diet.putDiet);
router.get('/get', diet.getDiet);
router.delete('/delete', diet.deleteDiet);
exports.default = router;
