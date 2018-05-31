<template>
 <div class="address">
	<nav-header></nav-header>
 	<bread>
 		<span slot="a">address</span>
 	</bread>
	<div class="steps" >
		<div class="elements active">
			<p>Confirm Address</p>
			<div class="circle"></div>
		</div>
		<div class="elements">
			<p>View Your Order</p>
			<div class="circle"></div>
			
		</div>
		<div class="elements">
			<p>Make Payment</p>
			<div class="circle"></div>

		</div>
		<div class="elements">
			<p>Order Confirmation</p>
			<div class="circle"></div>

		</div>
	</div>
	<h3 class="title">SHIPPING ADDRESS</h3>
	<div class="addressList">
		<div class="addressItem" v-for="(item,index) in addressListFilter"  >
			<div class="content" v-bind:class="{'ItemActived':checkIndex == index}" @click="selectContent(item.addressId,index)" >
				<h3>
		<svg>
					<use xlink:href="#icon-yonghu"></use>
		</svg>{{item.userName}}</h3>
				<p><svg>
					<use xlink:href="#icon-youxiang"></use>
		</svg>{{item.postCode}}</p>

				<p><svg>
					<use xlink:href="#icon-dianhua"></use>
		</svg>{{item.tel}}</p>
				<p><svg>
					<use xlink:href="#icon-dashaxiaoqudizhi01"></use>
		</svg>{{item.streetName}}</p>
				<svg class="logo" @click="delAddressModal(item.addressId)">
					 <use xlink:href="#icon-unie639" ></use>
				</svg>
				<div class="setDefault" v-if="item.isDefault"><svg class="DefaultAddress">
					<use xlink:href="#icon-dizhi"></use>
		</svg></div>
				<div class="setDefault setDefaultBtn" v-if="!item.isDefault" @click="setDefault(item.addressId)">设为默认地址</div>

			</div>
			
		</div>
		<div class="remove addressItem">
			<div class="content">

				<div class="line line1"></div>
				<div class="line line2"></div>
				<p class="words">Add new address</p>
			</div>
		</div>
		
	</div>
	<div class="more" @click="expand">more
		<svg class="logo2">
					<use xlink:href="#icon-moreinfo"></use>
		</svg></div>
		<h3 class="title">SHIPPING METHOD</h3>
	<div class="addressList">
		<div class="addressItem">
			<div class="content">
				<h3>standard shipping</h3>
				<p>Free</p>

				<p>10000000</p>
				<p>Default address</p>
				<svg class="logo">
				   <use xlink:href="#icon-unie639"></use>
				</svg>
				
			</div>
			
		</div>
			<div class="check">
				<a href="javascript:void(0)"  @click="checkOrder">NEXT</a>	

			</div>
	</div>
	<modal v-show="delModal">
		<p slot="message">确定要删除该地址吗？</p>
		<a href="javascript:" slot="btn1" @click="AddressDelete">是的</a>
		<a href="javascript:" slot="btn2" @click="closeDelModel">我按错了</a>
	</modal>
	
	<navfooter class="footer"></navfooter>	
</div>


</template>

<style>
	/*.footer{
		border-top:3px solid  #d8dade;
		margin-top:10px; 
	}*/


	.DefaultAddress{
		fill: orange;
	}
	
	.address{
	 padding:20px 10px;

	}
	*{
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	.address .steps{
	 
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
	
	
	

	.address .title{
		margin-top:40px;
		font-size:20px; 
		color: black;
		letter-spacing:5px;
	}
	.addressItem{
		position: relative;
		padding:10px; 
		width:25%;
	}
	.address .addressItem .content{
		display: flex;
		flex-direction:column;
		justify-content:space-between;
		align-items: flex-start;
		padding:10px;
		height:150px;
		border:2px solid grey; 
		width:100%;
		position: relative;
		

	}
	.address .addressItem .content h3{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address .addressItem .content p{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address .addressItem .content:hover{
		cursor: pointer;
		border:2px solid orange;
		 
	}

	.address .addressItem .logo{
		width:20px;
		height: 20px;
		position: absolute;
		right:20px;
		bottom: 20px;
	}

	.address .addressList{
		position: relative;
		display: flex;
		flex-wrap:wrap;
	}

	.address .more{
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: orange;
	}
	.address .more .logo2{
		width:12px;
		height:12px;
		fill:orange;
	}

	.addressList .check{
		display: inline-block;
		background: red;
		color:white;
		letter-spacing:3px;
		position:absolute;
		right:0;
		bottom:0;
		display: flex;
		width:160px;
		height:40px;
		justify-content: center;
		align-items: center;
	}
	.addressList .check a{
		color: white;
	}
	.line{
		position: absolute;
		width:50px;
		height:2px;
		background:black;
		/*position: absolute;*/
		top:50%;
		left:50%;
		transform: translate(-50%,-50%); 
	}

	.line2{
		transform: translate(-50%,-50%) rotate(90deg); 

	}
	.words{
		width:100%;
		display: inline-block;
		margin-top:90px; 
		text-align: center;
		font-size:12px; 
	}
	.logo2{
		transform: rotate(0deg);
		transition: 0.5s all 
	}
	.logoRotate{
		transform: rotate(180deg);
		transition: 0.5s all;
	}
	.ItemActived {
		border:2px orange solid !important;
	}
	.setDefault{
		position: absolute;
		right:20px;
		top:20px;
	}
	.content svg{
		width:20px;
		height:20px; 
		margin-right:5px; 
	}
	.setDefaultBtn{
		opacity:0;
		transition:0.5s all;

	}
	.content:hover .setDefaultBtn{
		opacity:1;
		transition:0.5s all;
		color:orange;
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
		    	return {
				      msg: 'Welcome to Your Vue.js App',
				      useId:document.cookie.substr(7,9),
				      addressList:[],
				      limit:3,
				      checkIndex:0,
				      delModal:false,
				      delAddressID:'',
				      selelctAddressId:0
				    }
		    },
		    mounted(){
		    	this.init()
		    },
		    computed:{
		    	addressListFilter(){
		    		return this.addressList.slice(0,this.limit)
		    	}

		    },
		    methods:{
		    	init(){
		    		var userId = document.cookie.substr(7,9)
		    		axios.post("http://localhost:3000/users/cartList",{
						userId:userId
					}).then((response)=>{
						let res = response.data
						this.addressList = res.result.addressList

					})
		    		
		    		
		    	},
		    	expand(){
		    		if(this.limit === 3){
		    			this.limit = this.limit + (this.addressList.length - 3)
		    			$('.more .logo2').toggleClass('logoRotate')
		    		}else{
		    			this.limit = 3 
		    			$('.more .logo2').toggleClass('logoRotate')

		    		}
		    		
		    		
		    	},
		    	

		    	setDefault(addressId){
		    		var userId = document.cookie.substr(7,9)
		    		axios.post("http://localhost:3000/users/setDefault",{
		    			userId:userId,
		    			addressId:addressId
		    		}).then((response)=>{
		    			let res = response.data
		    			this.addressList = res.result
		    		})

		    	},
		    	delAddressModal(addressId){
		    		this.delAddressID = addressId
		    		this.delModal = true
		    		
		    	},
		    	closeDelModel(){
		    		this.delModal = false
		    	},
		    	AddressDelete(){
		    		var userId = document.cookie.substr(7,9)
		    		console.log(this.delAddressID)
		    		axios.post("http://localhost:3000/users/delAddress",{
		    			userId:userId,
		    			addressId:this.delAddressID
		    		}).then((response)=>{
		    			console.log(response.data.result)
		    			this.init()
		    		})
		    		this.delModal = false
		    	},
		    	checkOrder(){
		    		this.$router.push({
							path:'/checkOrder',
							query:{
								'addressId':this.selelctAddressId
							}
					})
		    	},
		    	selectContent(addressId,index){
		    		this.checkIndex = index
		    		this.selelctAddressId = addressId
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