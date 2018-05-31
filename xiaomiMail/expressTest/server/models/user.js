var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":Array,
	"cartList":[
		{
			"productId":String,
			"productName":String,
			"productPrice":String,
			"productImg":String,
			"checked":String,
			"productNum":String

		}
	],
	"addressList":[
	 	{
            "userName" : String, 
            "addressId":String,
            "streetName" : String, 
            "postCode" : String, 
            "tel" : Number, 
            "isDefault" : Boolean
        }
	]

})


module.exports = mongoose.model("User",userSchema,"users")