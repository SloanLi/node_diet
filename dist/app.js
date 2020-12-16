"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const bodyp = require('body-parser');
const mongoose = require('mongoose');
const routes_1 = __importDefault(require("./routes"));
mongoose.connect('mongodb://127.0.0.1:27017/diet');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('数据库连接成功');
});
app.use(bodyp.urlencoded({ extended: false, limit: 20 * 1024 }));
const port = 3000;
routes_1.default(app);
app.listen(port, () => console.log(`app listening on port ${3000}!`));
