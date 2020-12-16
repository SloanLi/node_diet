"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userModel = mongoose.Schema({
    userId: String,
    userName: String,
    height: Number,
    weight: Number,
    bmi: Number,
    type: Number,
    age: Number
});
exports.default = userModel;
