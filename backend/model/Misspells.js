const mongoose=require('mongoose')
const misspellsSchema=mongoose.Schema({
    Id:Number,
    URL:String,
    caption:String,
    created_by:String
})
const misspellsModel= mongoose.model("Misspell",misspellsSchema)

module.exports={misspellsModel}