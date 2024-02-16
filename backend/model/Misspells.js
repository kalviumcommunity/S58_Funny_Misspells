const mongoose=require('mongoose')
const misspellsSchema=mongoose.Schema({
    Id:Number,
    URL:String,
    caption:String,
    alt:String
})
const misspellsModel= mongoose.model("Misspell",misspellsSchema)

module.exports={misspellsModel}