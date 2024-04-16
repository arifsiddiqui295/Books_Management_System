const mongoose = require('mongoose')
const bookSchema= new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    isbn:String,
    publisher:String,
})
const book = mongoose.model('Book', bookSchema)
module.exports = book;