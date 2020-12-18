const mongoose=require('mongoose')
const userModel=mongoose.Schema({
    openId:String,
    userName:String,
    height:Number,
    weight:Number,
    bmi:Number,
    type:Number,
    age:Number
})
export default mongoose.model('user',userModel)
