const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const userModel = mongoose.Schema({
    openId:String,
    userName:String,
    height:Number,
    weight:Number,
    bmi:Number,
    type:Number,
    age:Number
});
export default mongoose.model('user', userModel);
