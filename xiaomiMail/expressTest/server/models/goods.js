var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
	"productId":String,
	"productName":String,
	"productPrice":Number,
	"productImage":String,
	"productNum":Number,
	"checked":String
})

module.exports = mongoose.model('goods',productSchema)