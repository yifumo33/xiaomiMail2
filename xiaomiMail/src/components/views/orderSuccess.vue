<template>
	<div class="orderSuceess">
			<nav-header></nav-header>
			<bread>
				<span slot='a'>order</span>
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
			<div class="elements active">
				<p>Order Confirmation</p>
			<div class="circle"></div>
		</div>
	</div>
			<div class="OkImg">
				<img src="./static/img/ok.jpg" alt="">
			</div>
			<section class="imformation">
					<h3>Congratulations!</h3>
					<h3>Your order is  under processing</h3>
				<div class="orderId">
					<span>Order ID:{{orderId}}</span>
					<span>Order total:{{orderTotal | currency('¥')}}</span>
				</div>
				<div class="action">
					<a href="javascript:" @click="toCartList">CART LIST</a>
					<a href="javascript:" @click="toGoodsList">GOODS LIST</a>
				</div>
			</section>
			<navfooter class="footer"></navfooter>

	</div>
</template>

<style>
	.orderSuceess{
		padding:20px 10px;
	}
	.imformation{
		
		text-align: center;
	}
	.action{
		display: inline-block;
	}
	.action a{
		margin:10px;
		display: inline-block;
		border:1px solid red;
		padding:5px 60px;
		font-size: 16px;
		letter-spacing:2px;
		color: red;
	}

	.orderId{
		width:400px;
		margin:30px auto; 
		display: flex;
		justify-content:space-between;
	}
	*{
		padding:0;
		margin:0;
		box-sizing: border-box;
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

	.footer{
		margin-top:20px;
	}
	.OkImg{
		width:200px;
		height:200px;
		margin:40px auto
	}
	.OkImg img{
		width:100%;
		height:100%;
	}
</style>

<script>
	import NavHeader from './Header'
    import bread from './bread'
    import navfooter from './footer'
    import pricePannel from './price-pannel'
    import wrap from'./wrap'
    import axios from  'axios'


	export default{
		data(){
			return{

			}
		},
		methods:{
			toCartList(){
				this.$router.push({
					path:'/cart'
				})
			},
			toGoodsList(){
				this.$router.push({
					path:'/'
				})

			}
		},
		computed:{
			orderId(){
				return this.$route.query.orderId
			},
			orderTotal(){
				return this.$route.query.orderTotal
			}
		},
		components:{
				NavHeader:NavHeader,
				bread:bread,
				navfooter:navfooter,
				pricePannel:pricePannel,
				wrap:wrap
			},
		mounted(){

				console.log(this.$route.query.orderId)
				console.log(this.$route.query.orderTotal)
			}

	}
</script>