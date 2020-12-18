const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const dietModel = mongoose.Schema({
    dietName:String,
    count:Number,
    totalCalorie:Number,
    type:Number,
    avgCalorie:Number,
    userId:String,
    creatDate:String
});
export default mongoose.model('diet', dietModel);