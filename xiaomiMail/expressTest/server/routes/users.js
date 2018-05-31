var express = require('express');
var router = express.Router();
var User = require('../models/user')
require('./../util/util')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('test');
});
router.get('/haha', function(req, res, next) {
  res.render('yif', { title: 'Express' });
});

router.post('/login',function(req,res,next){
	

	var param = {
		userName:req.body.userName
	}
	User.findOne(param,function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			if(doc){
	
			 res.cookie("userId",doc.userId,{
			 	domain:'',
			 	credentials:'include',
			 	maxAge:1000*60*60
			 })
			 	// req.session.user = doc
				res.json({
					status:'0',
					msg:'',
					result:{
						doc:doc,
						userName:doc.userName,
						userId:doc.userId
					}
				})
			}else{
				res.json({
					status:'0',
					msg:'no exit',
					result:{
						msg:'用户不存在'
					}
				})
			}

		}
	})

})


router.post("/logout",function(req,res,next){
	res.cookie("userId","",{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:"0",
		msg:'',
		result:''
	})

})

router.post('/cartList',function(req,res,next){
	var userId = req.body.userId
	// var productId = req.body.productId
	// console.log("这是用户的ID:" + req.body.userId)
	// console.log(typeof parseInt(req.body.userId))
	 //这里我把userId放进去,没有效果
	User.findOne({userId:userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			if(doc){
	
			 res.cookie("userId",doc.userId,{
			 	domain:'',
			 	credentials:'include',
			 	maxAge:1000*60*60
			 })
			 	// req.session.user = doc
				res.json({
					status:'0',
					msg:'',
					result:{
						cartList:doc.cartList,
						addressList:doc.addressList
					}
				})
			}else{
				res.json({
					status:'0',
					msg:'no exit',
					result:{
						msg:'用户不存在'
					}
				})
			}

		}
	})

})



router.post("/cart/del",function(req,res,next){	
	console.log(req.body.userId)
	var userId = req.body.userId
	var productId = req.body.productId
	User.update({
		userId:userId
	},{
		$pull:{
			'cartList':{
				'productId':productId
			}
		}
	},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:'suc'
			})
		}
	})
})


router.post("/cart/edit",function(req,res,next){
	
	var userId = req.body.userId
	console.log("userId:"+ userId)
	var productId = req.body.productId
	console.log("productId:"+ productId)
	var checked = req.body.checked
	var productNum = req.body.productNum
	console.log("productNum:"+ productNum)

	User.update({
		"userId":userId,
		"cartList.productId":productId
	},{
		"cartList.$.checked":checked,
		"cartList.$.productNum":productNum
	},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:'editsuc'
			})
		}
	})
})


router.post("/setDefault",function(req,res,next){
	var userId = req.body.userId
	console.log(userId)
	var addressId = req.body.addressId
	console.log(addressId)
	if(!addressId){
		res.json({
			status:1003,
			msg:'',
			result:''
		})
	}else{
		User.findOne({
			"userId":userId //这里只能填一个参数
		},function(err,doc){
			if(err){
				res.json({
					status:'0',
					msg:'',
					result:'数据不存在'
				})
			}else{
				var addressList = doc.addressList
				addressList.forEach((item)=>{
					if(item.addressId == addressId){
						item.isDefault = true
					}else{
						item.isDefault = false
					}
				})
				doc.save(function(err1,doc1){
					if(err1){
						res.json({
							status:'0',
							msg:'',
							result:'数据不存在'
						})
					}else{
						res.json({
							status:'1',
							msg:'',
							result:doc1.addressList
						})
					}
				})
			}
		})
	}

})



router.post("/delAddress",function(req,res,next){
	var addressId = req.body.addressId
	var userId = req.body.userId
	User.update({
		"userId":userId
	},{			
		$pull:{
			'addressList':{
				"addressId":addressId
		  }
		}
	  },function(err,doc){
	  	if(err){
	  		res.json({
	  			status:'1',
	  			msg:err.message,
	  			result:''
	  		})
	  	}else{
	  		res.json({
	  			status:'0',
	  			msg:'',
	  			result:doc
	  		})
	  	}
	  }
	)
})


router.post("/payMent",function(req,res,next){
	var userId = req.body.userId
	var addressId = req.body.addressId
	var orderTotal = req.body.orderTotal
	User.findOne({userId:userId},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			var address = '',goodList = []
			doc.addressList.forEach((item)=>{
				if(addressId == item.addressId){
					address = item
				}
			})
			doc.cartList.filter((item)=>{
				if(item.checked == '1'){
					goodList.push(item)
				}
			})

			var plateform = '622'
			var r1 = Math.floor(Math.random()*10)
			var r2 = Math.floor(Math.random()*10)

			var sysDate = new Date().Format('yyyyMMddhhmmss')
			console.log(sysDate)
			var createDate =  new Date().Format('yyyyMMdd hh:mm:ss')
			console.log(createDate)
			var orderId = plateform+r1+sysDate+r2

			var order = {
				orderId:orderId,
				orderTotal:orderTotal,
				addressInfo:address,
				goodList:goodList,
				orderStatus:'1',
				createDate:createDate
			}

			doc.orderList.push(order)
			doc.save(function(err1,doc1){
				if(err1){
						res.json({
							status:'1',
							msg:err.message,
							result:''
						})

				}else{
					res.json({
							status:'0',
							msg:'',
							result:{
								orderId:order.orderId,
								orderTotal:order.orderTotal
							}
						})

				}
			})




		}
	})
})




module.exports = router;


	// var addressList = doc.addressList
			// addressList.forEach((item)=>{
			// 	if(item.addressId == addressId){
			// 		item.isDefault = true
			// 	}else{
			// 		item.isDefault = false
			// 		}
			// 	})
			// }
			// doc.save(function(err1,doc1){
			// 	if(err1){
			// 		res.json({
			// 			status:'1',
			// 			msg:err.message,
			// 			result:''
			// 		})

			// 	}else{
			// 		res.json({
			// 			status:'0',
			// 			msg:'',
			// 			result:'setDefault suc'
			// 		})
			// 	}
