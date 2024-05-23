// const { text } = require('express')
const {Schema,model} = require('mongoose')


const CodeFile = new Schema({
    _id : String,
    fileName:String,
    fileExt:String,
    text: String
})

module.exports = model("CodeFile",CodeFile)