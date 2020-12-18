const mongoose=require('mongoose')
const dietModel=mongoose.Schema({
    dietName:String,
    count:Number,
    totalCalorie:Number,
    type:Number,
    avgCalorie:Number,
    userId:String,
    creatDate:String
})
export default mongoose.model('diet',dietModel)