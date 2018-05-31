var express = require('express')
var router =express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods') //获取模块信息


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo')

mongoose.connection.on("connected",function(){ //监听连接的状态
	console.log("成功")
})

mongoose.connection.on("error",function(){
	console.log("错误")
})

mongoose.connection.on("disconnected",function(){
	console.log("失败")
})

router.get("/",function(req,res,next){ //设置路径，当访问到这一路径时
	let page = parseInt(req.param("page"))
	let pageSize = parseInt(req.param("pageSize"))
	let skip = (page - 1)*pageSize
    let sort = parseInt(req.param("sort"))
	let params={}
	let priceGt = ''
	let priceLte = ''
	let priceLevel = req.param("PriceLevel")
	console.log(priceLevel)

 if(priceLevel != 'all'){
 	switch(priceLevel){
		case '0':
		priceGt = 0
		priceLte = 500
		break
		case '1':
		priceGt = 500
		priceLte = 1500
		break
		case '2':
		priceGt = 1500
		priceLte = 2500
		break
		case '3':
		priceGt = 2500
		priceLte = 4000
		break
	}
	params = {
		productPrice:{
			$gt:priceGt,
			$lte:priceLte
		}
	}

 }
	

	let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
	goodsModel.sort({"productPrice":sort})

	goodsModel.exec(function(err,doc){
		if(err){
			res.json({          //返回json格式的文件
				status:'1',
				msg:err.message
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
})



router.post("/addCart",function(req,res,next){
	var userId = '100000078',productId = req.body.productId
	console.log("这次添加的货物:" + productId)
	var User = require('../models/user')

	User.findOne({userId:"100000078"},function(err,userDoc){

		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			console.log("userDoc:" + userDoc)
			if(userDoc){
			let goodsItem = ''
			userDoc.cartList.forEach(function(item){
				if(item.productId == productId){
					goodsItem = item
					item.productNum++
				}
			})
			if(goodsItem){
				userDoc.save(function(err2,doc2){
                		if(err2){
                			res.json({
                				status:'1',
                				msg:err2.message
                			})
                		}else{
                			res.json({
                				status:'0',
                				msg:'',
                				result:doc2
                			})
                		}

                	})

			}else{
				 Goods.findOne({productId:productId},function(err1,doc){
			if(err){
			res.json({
				status:'1',
				msg:err.message
			})
			}else{
                if(doc){
                	doc.productNum = 1
                	doc.checked = 1
                	console.log("这是添加的货物：" + doc)
                	userDoc.cartList.push(doc)
                	console.log("这是购物车:"+userDoc)
                	userDoc.save(function(err2,doc2){
                		if(err2){
                			res.json({
                				status:'1',
                				msg:err2.message
                			})
                		}else{
                			res.json({
                				status:'0',
                				msg:'',
                				result:doc2
                			})
                		}

                	})
                }
			  }
		   })

			}
		   
		  }
		}
	})

})



module.exports = router //暴露这一端口