/* eslint-disable no-console */
const express = require('express');
const app = express();
const bodyp = require('body-parser');
const mongoose = require('mongoose');
import router from './routes';
mongoose.connect('mongodb://127.0.0.1:27017/diet');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('数据库连接成功');
});
app.use(bodyp.urlencoded({ extended: false }));
const port = 3000;
router(app);
app.listen(port, () => console.log(`app listening on port ${port}!`));