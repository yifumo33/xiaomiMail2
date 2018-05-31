<template>
	
 <div class="myCart">
	<nav-header></nav-header>

	<bread>
		<a href="#" slot='a'>Cart</a>
	</bread>
	<h3>My CART</h3>
	<ul class="tabs">
		<li class="section1">ITEMS</li>
		<li class="section2">PRICE</li>
		<li class="section3">QUANTITY</li>
		<li class="section4">SUBTOTAL</li>
		<li class="section5">EDIT</li>
	</ul>		
	
	<ul class="goodsList">
		<li v-for="item in cartList">
			<div class="items">
				
						<svg v-bind:class="{'svgColor':item.checked == '1'}"  @click="editCart('check',item)"  >
						    	<use xlink:href="#icon-zhengque"></use>
						</svg>
				<div class="productImg">
					<img v-bind:src="`${item.productImg}`" alt="${item.productName}">	
				</div>
				<p>{{item.productName}}</p>
			</div>
			<div class="price">
				{{item.productPrice| currency('¥')}}
			</div>
			<div class="quantity">
				<span @click="editCart('add',item)">+</span>
				<span>{{item.productNum}}</span>
				<span @click="editCart('minu',item)">-</span>
			</div>
			<div class="subtotal">
				{{item.productNum * item.productPrice | currency('¥')}}
			</div>
			<div class="edit" >
					<svg @click="delCart(item.productId)">
						    	<use xlink:href="#icon-unie639"></use>
					</svg>
			</div>
		</li>
	</ul>
	<div class="Check">
		<div class="selectAll">
			<svg  @click="selectAll" v-bind:class="{'svgColor':checkAllFlag}">
						  <use xlink:href="#icon-zhengque"></use>
						
			</svg>
			<span> Select ALL</span>
			
		</div>
		<div class="CheckDiv">
			<span>item total:</span>
			<span class="totalPrice">{{totalPrice | currency('¥') }}</span>
			<div class="checkout" @click = "checkOut" v-bind:class="{'dis-btn':this.totalPrice == 0}">
				CHECKOUT
			</div>
		</div>
		
	</div>

      <navfooter class="footer"></navfooter>

 </div>
</template>


<style>
	.subtotal,
	.totalPrice{
		color:red
	}
	.footer{
		margin-top:20px;
	}
	.myCart{
		padding: 20px;
	}
	.myCart h3{
		font-weight:bolder;
		line-height: 80px;
	}
	.tabs{
		display:flex;
		justify-content:space-between;
		width:100%;
		background:#606060; 
	}
	.tabs li{
		display: flex;
		justify-content: center;
		align-items: center;
		height:40px;
		color: white; 
	}
	.tabs .section1{
		width:30%; 
	}
	.tabs .section2{
		width:20%; 
	}
	.tabs .section3{
		width:20%; 
	}
	.tabs .section4{
		width:20%; 
	}
	.tabs .section5{
		width:10%; 
	}

		*{
			padding:0;
			margin:0;
			box-sizing:border-box;
		}
		.myCart{
			background:#fefefe;
		}
		.goodsList{
			border:1px solid;
		}
		.goodsList li{
			padding: 30px 5px;
			display: flex;
			width:100%;
			align-items:center;
		}

		.goodsList li .circle{
			display:flex;
			display: inline-block;
			width:20px;
			height:20px;
			border:1px solid ;
			border-radius:50%;

		}

		.goodsList li .items{
			display:flex;
			align-items: center;
			justify-content: space-around;
			width: 30%;
		}

		.goodsList li .price{
			display:flex;
			justify-content: center;
		    width:20%;
		}

		.goodsList li .quantity{
			display:flex;
			justify-content: center;
		    width:20%;

		}
		.goodsList li .subtotal{
			display:flex;
			justify-content: center;
		    width:20%;

		}
		.goodsList li .edit{
			display:flex;
			justify-content: center;
		    width:10%;
		}

		.items .productImg{
			margin:0 20px;
			border:1px solid #f4f4f4; 
			width:120px;
			height:120px;
		}

		.items .productImg img{
			width: 100%;
			height:100%; 
		}

		

		.quantity span{
			cursor:pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			width:30px;
			height:30px;
			text-align: center;
			line-height:30px;
			font-size:20px;  

		}
		.quantity span:nth-of-type(odd){
			background:grey; 
			border: 1px solid #f4f4f4;
		}
		.quantity span:nth-of-type(odd){
			border-top:1px solid #f4f4f4;
			border-bottom:1px solid #f4f4f4;

		}
		 svg{
			transform: translate(-1px,2px);
			width:20px;
			height:20px;
		}
		.subtotal{
			width:100%;
			display:flex;
			justify-content:space-between;
		}

		.circle{
			width:20px;
			height:20px;
			display: inline-block;
			border-radius:50%;
			border:1px solid; 
			

		}
		.Check{
			margin-top:40px; 
			padding:10px 0px 10px 10px;
			border-left:1px solid;
			border-top:1px solid;
			border-bottom:1px solid;
			height:50px;
			display: flex;
			justify-content:space-between;
			width:100%;
		}
		.Check .selectAll{
			display: flex;
			width:30%;
			align-items: center;

			justify-content: flex-start;
		}
		.CheckDiv{
			display: flex;
			/*justify-content: center;*/
			align-items: center;
		}
		.CheckDiv .checkout{
			display:inline-block;
			width:100px;
			height:50px;
			background:red;
			color:white;
			line-height:50px; 
			font-size:14px; 
			text-align: center;	
			margin-left:20px; 
			cursor:pointer;
			transition: all 0.5s;

		}

		.CheckDiv .checkout:hover{
			background: rgba(255,0,0,0.5);
			transition: all 0.5s;
		}	

.svgColor{
	fill:red;
}

.CheckDiv .dis-btn{
	background:grey;
	color:black;
}

.CheckDiv .dis-btn:hover{
	background:grey;
	color:black;
}
</style>


<script>
    import NavHeader from './Header'
    import bread from './bread'
    import navfooter from './footer'
    import pricePannel from './price-pannel'
    import wrap from'./wrap'
    import axios from  'axios'
    import {currency} from './currency'


    export default{
    	data(){
    		return{
    			userId:document.cookie.substr(7,9),
    			cartList:[],
    			productId:'',
    			selectAllGoods:'',
    			checkAllFlag:false
    		

    		}
    	},
    	filters:{
    		currency:currency
    	},
    	mounted(){
    		this.init()
    		
    	
 
    			    		

    	},
    	computed:{
    		
 
    		totalPrice(){
    			var sum  = 0
    			this.cartList.forEach(function(item){
    				if(item.checked == '1'){
    					
    					var aaa = parseFloat(item.productNum) * parseFloat(item.productPrice)
    					sum = sum + aaa
    				}
    			})
    			return sum
    		}
    	},
    	components:{
				NavHeader:NavHeader,
				bread:bread,
				navfooter:navfooter,
				pricePannel:pricePannel,
				wrap:wrap
			},	
			methods:{
				init(){
					// console.log(typeof document.cookie)
					
					this.userId = document.cookie.substr(7,9)
					axios.post("http://localhost:3000/users/cartList",{
						userId:this.userId
					}).then((response)=>{
						let res = response.data
						this.cartList = res.result.cartList

					})
				},
				delCart(productId){
					this.productId = productId
					this.userId = document.cookie.substr(7,9)
					console.log('userId是'+this.userId)
					axios.post("http://localhost:3000/users/cart/del",{
						productId:this.productId,
						userId:this.userId
					}).then((response)=>{
						this.$store.commit("reduceCartCount")
							this.init()
					})
				},
				editCart(flag,item){

					if(flag == 'add'){
						item.productNum++
					}else if(flag == "minu"){
						if(item.productNum <= 1)
							return
						item.productNum--
					}else {
						if(item.checked == '1'){
							item.checked = '0'
							console.log('item.checked:' + item.checked)
						}else{
							item.checked = '1'
							console.log('item.checked:' + item.checked)

						}
					}
					axios.post("http://localhost:3000/users/cart/edit",{
						productId:item.productId,
						productNum:item.productNum,
						userId:this.userId,
						checked:item.checked
					}).then((response)=>{
						let res = response.data

					})	

					var sum = 0;
			
					this.cartList.forEach(function(item){
						if(item.checked == '1'){
							sum ++
						}
					})	
					if(sum === this.cartList.length){
						$('.selectAll').addClass('svgColor')
					}else{
						$('.selectAll').removeClass('svgColor')	
					}
				},
				selectAll(){
					if(!this.checkAllFlag){
						this.checkAllFlag = !this.checkAllFlag
						this.cartList.forEach((item)=>{
						item.checked = '1'
						axios.post("http://localhost:3000/users/cart/edit",{
						productId:item.productId,
						productNum:item.productNum,
						userId:this.userId,
						checked:item.checked
						}).then((response)=>{
							let res = response.data

						})
				  })}else{
						this.checkAllFlag = !this.checkAllFlag
						this.cartList.forEach((item)=>{
						item.checked = '0'
						axios.post("http://localhost:3000/users/cart/edit",{
						productId:item.productId,
						productNum:item.productNum,
						userId:this.userId,
						checked:item.checked
						}).then((response)=>{
							let res = response.data

						})
				  })}

				},
				checkOut(){
					if(this.totalPrice == 0){
						alter('购物车为空！请添加商品')
					}else{
						this.$router.push({
							path:'/address'
						})
					}
				}
			}
    }
</script>