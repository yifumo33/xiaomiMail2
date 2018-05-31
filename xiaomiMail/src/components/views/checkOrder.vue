<template>
	<div class="checkOrder">
		<nav-header></nav-header>
		<bread>
			<span slot="a"> OrderCheck</span>
		</bread>	
		<div class="steps" >

		<div class="elements active">
			<p>Confirm Address</p>
			<div class="circle"></div>
		</div>
		<div class="elements active">
			<p>View Your Order</p>
			<div class="circle"></div>
			
		</div>
		<div class="elements active">
			<p>Make Payment</p>
			<div class="circle"></div>

		</div>
		<div class="elements">
			<p>Order Confirmation</p>
			<div class="circle"></div>

		</div>
	</div>
	<h3 class="OrderTitle">ORDER CONTENT</h3>
	<ul class="tabs">
		<li class="section1">ORDER CONTENT</li>
		<li class="section2">PRICE</li>
		<li class="section3">QUANTITY</li>
		<li class="section4">SUBTOTAL</li>
	</ul>
	<ul >
		<li class="OrderList" v-for="item in cartList">
			<div class="ORDERCONTENT">

				<img v-bind:src="`${item.productImg}`" alt="">

			<span>{{item.productName}}</span>
			</div>
			<div class="PRICE" style="">
				{{item.productPrice | currency('¥')}}
			</div>
			<div class="QUANTITY">
				x{{item.productNum}}
			</div>
			<div class="SUBTOTAL" style="color:red">
				{{item.productPrice * item.productNum | currency('¥')}}
			</div>
		</li>

		
	</ul>

		<div class="moneys">
			<ul class="moneysList">
				<li><span>Item subtotal:</span><span>{{Itemsubtotal | currency('¥')}}</span></li>
				<li><span>Shipping:</span><span>{{shopping | currency('¥')}}</span></li>
				<li><span>Order total:</span><span style="color:red">{{Itemsubtotal - 10 | currency('¥')}}</span></li>
			</ul>
		</div>
		
		<section class="action">
			<div class="previous">
			<router-link to="/address">Previous</router-link>	
			</div>
			<div class="payment" @click="payment">PROCEED TO PAYMENT</div>
		</section>

		<navfooter class="footer"></navfooter>
	</div>

	
</template>

<style>
	*{
		font-family: akkurat,sans-serif;
	}

	.QUANTITY{
		font-size:16px;
		font-weight:thin; 
	}
	.footer{
		margin-top:20px; 
	}
	.action{
		width:100%;
		margin-top:20px; 
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.action > div{
		cursor: pointer;
		color:white;
		
		padding:8px;
		background:#e42336;
		font-size:18px;
		border:1px solid;
	}
	.action .previous{
		color:#e42336;
		background:#ffffff;

	}

	.action .previous a{
		color:#e42336;
		font-size: 18px;
	}

	.action .payment{
		color:white;
		background:#e42336;
	}
	.moneysList{
		margin-top:2vw; 
	}
	.moneysList li {
		font-size: 1.4rem;

		 color: #605f5f;
    	font-family: akkurat,sans-serif;
		margin:2px 0px; 
		display: flex;
		flex-direction: row;

	}
	.moneysList li > span:first-child{
		display: inline-block;
		flex: 1;
		
		text-align:right; 
	}
	.moneysList li > span:nth-child(2){
		
		display: inline-block;
		min-width:15%;
		text-align:right;
		
	}

	.OrderTitle{

		margin: 30px 0px 20px 0px;
	}
	*{
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	 .steps{
	 
	 display: flex;
	}
	 .steps .elements{
	 position: relative;
	 display: flex;
	 height:50px; 
	 justify-content: center;
	 align-items: center;
     width:25%;
     border-bottom:3px solid grey; 
	}


	 .circle{
		display: block;
		width:12px;
		height:12px;
		border-radius:50%;
		background: grey;
		position: absolute;
		top:100%;
		left:50%;
		transform: translateY(-40%); 

	}

	.active {
		color:red !important;
		border-bottom:3px solid red !important;
	}
	.active .circle{
		background:red 
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
		width:40%; 
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
	.OrderList{
		border:1px solid #e9e9e9;
		display: flex;
	}
	.OrderList div{
		height:120px;
		padding: 20px 10px;
	}
	.ORDERCONTENT{
		width:40%;
	}
	.PRICE,.QUANTITY,.SUBTOTAL{
		font-size:16px;
		display:flex;
		justify-content: center;
		align-items: center;
		width:20%;
	}
	.ORDERCONTENT {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.ORDERCONTENT img{
		height:100%;
		width:100px;
	}
	.ORDERCONTENT span{
		font-size:16px;
		font-weight:bolder;
	}
	.checkOrder{
		padding: 20px 10px ;
	}
</style>

<script>
			import NavHeader from './Header'
		    import bread from './bread'
		    import navfooter from './footer'
		    import pricePannel from './price-pannel'
		    import wrap from'./wrap'
		    import axios from  'axios'
		    import modal from './../modal'


	export default{
			data(){
				return{
					cartList:[],
					shopping:10,
					userId:'',
					addressId:''

				}
			},
			computed:{
				Itemsubtotal(){
					var sum = 0
					this.cartList.forEach((item)=>{
						sum += item.productNum * item.productPrice
					})
					return sum
				}

			},
			mounted(){
				this.init()
			},
			methods:{
				init(){
					// console.log(typeof document.cookie)
					
					this.userId = document.cookie.substr(7,9)
					axios.post("http://localhost:3000/users/cartList",{
						userId:this.userId
					}).then((response)=>{
						let res = response.data
						var aa = []
						res.result.cartList.forEach((item)=>{
							if(item.checked == '1'){
								aa.push(item)
							}
						})
						this.cartList = aa

					})
				},
				payment(){
					
					this.addressId = this.$route.query.addressId
					console.log(this.addressId)
					this.userId = document.cookie.substr(7,9)
					axios.post("http://localhost:3000/users/payMent",{
						userId:this.userId,
						addressId:this.addressId,
						orderTotal:this.Itemsubtotal

					}).then((response)=>{
						let res = response.data
						console.log(res.result)
						if(res.status == '0'){
							console.log("创建成功")
							this.$router.push({
								path:'/orderSuccess',
								query:{
								'orderId':res.result.orderId,
								'orderTotal':res.result.orderTotal
								}
							})
						}

					})

				}
			},
		    components:{
				NavHeader:NavHeader,
				bread:bread,
				navfooter:navfooter,
				pricePannel:pricePannel,
				wrap:wrap,
				modal:modal
			}
	}
</script>