"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dietModel = mongoose.Schema({
    dietName: String,
    count: Number,
    totalCalorie: Number,
    type: Number,
    avgCalorie: Number,
    userId: String,
    creatDate: String
});
exports.default = mongoose.model('diet', dietModel);
