<template>
	<div class="GoodsList">
   <div class="modal-login" v-if="loginModalFlag">
		<div class='modal-close' href="javascript:void(0)" @click="closeLogin">X</div>

		<h3>Login in</h3>
		<p class="modal-warning" v-show="errorTiP">
			用户名或者密码错误
		</p>
		<div class="modal-UserName" >
			用户:<input type="text" placeholder="UserName" v-model="userName">	
		</div>
		<div class="modal-PassWord" >
			密码:<input type="password" placeholder="PassWord" v-model="userPwd">	
		</div>
			<button class="modal-login-button" @click="modalLogin">登陆</button>
	</div>
	<nav-header @loginShow="loginShow" v-bind:loginName="loginName" v-bind:logoutFlag="logoutFlag" @loginOut="loginOut"></nav-header>
	<bread>
		<span slot='a'>Goods</span>
	</bread>
	<pricePannel v-bind:priceFilter="priceFilter"></pricePannel>
	<wrap  v-bind:priceFilter="priceFilter" v-bind:priceLog="priceLog" @startWrapCover="startWrapCover" @closeLogin="closeLogin"></wrap>	

	<navfooter></navfooter>
	<div class="wrapcover" v-show="wrapFlag" @click="closeLogin"></div>
	
	</div>
	
</template>

<style>
	.GoodsList{
		padding:10px;
	}
	.modal-login{
			padding:20px 20px 200px 20px; 
			position: fixed;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			width:500px;
			height:200px;
			border:1px solid;
			z-index:999;
			background:white;
		}
		.modal-close{
			cursor: pointer;
			position:absolute;
			z-index:99; 
			right:20px;
			top:20px; 
		}
		.modal-warning{
			font-size:14px;
			color:red; 
		}
		.modal-UserName input,
		.modal-PassWord input{

			padding:5px 8px;
			width:80%;  
		}
		input{
			outline:none;
			border:0;
		}

		.modal-UserName,
		.modal-PassWord{
			border:2px solid #fefefe;
			padding:5px 8px;
			margin:10px 0 ; 
			border:1px solid;
		}
		.modal-login-button{
			width:100%;
			color:white;
			background: blue;
			text-align: center;
			padding:5px 0px;
			margin-bottom:150px;
			border:0;
		}
		.wrapcover{
			position: absolute;
			width:100%;
			height:100%;
			top:-5px;
			left: -5px;
			right: -5px;
			bottom: -5px;
			background:rgba(245,245,245,0.8)
		}

</style>

<script>
    import NavHeader from './Header'
    import bread from './bread'
    import navfooter from './footer'
    import pricePannel from './price-pannel'
    import wrap from'./wrap'
    import axios from  'axios'
    
	import './style.css'
	export default{
			data(){
				return{
					
					priceFilter:[
						{
							startPrice:'0.00',
							endPrice:'500.00'
						},
						{
							startPrice:'500.00',
							endPrice:'1500.00'
						},
						{
							startPrice:'1500.00',
							endPrice:'2500.00'
						},
						{
							startPrice:'2500.00',
							endPrice:'4000.00'
						}


					],
					userName:'',
					userPwd:'',
					errorTiP:false,
					loginModalFlag:false,
					wrapFlag:false,
					loginName:'Login',
					logoutFlag:false,
					priceLog:true
				}

			},
			computed:{
				nickName(){
					return this.$store.state.nickName
				},
				carCount(){
					return this.$store.state.carCount
				}
			},
			mounted(){

				if(document.cookie){
					var date=new Date(); 
					//将date设置为过去的时间 
					date.setTime(date.getTime()-10000); 
					//将userId这个cookie删除 
					document.cookie="userId=828; expires="+date.toGMTString();  
					document.cookie="userName=828; expires="+date.toGMTString();  	
				}
			},
			methods:{
				modalLogin(){
				if(!this.userName || !this.userPwd)
					this.errorTiP = true
				axios.post("http://localhost:3000/users/login",{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((response)=>{
					let res = response.data
					// console.log(res.result.userName)
					this.loginName = res.result.userName
					this.$store.commit("updateUserInfo",this.loginName)
					this.$store.commit("updateCartCount",res.result.doc.cartList.length)
					document.cookie = "userId=" + res.result.userId 
					document.cookie = "userName=" + res.result.userName
					if(!this.loginName){
						this.errorTiP = true

					}else{
						if(res.status == '0'){
						this.errorTiP = false
						this.loginModalFlag = false
						this.wrapFlag = false
						this.logoutFlag = true
						}else{
							this.errorTiP = true
							//to-do
						}
					}
						
				})
			},
			loginShow(){
				this.loginModalFlag = true
				this.wrapFlag = true

			},
			closeLogin(){
				this.errorTiP = false
				this.loginModalFlag = false
				this.wrapFlag = false
			},
			loginOut(){
				axios.post("http://localhost:3000/users/logout").then((res)=>{
					
					
				this.loginName = "Login"
				var date=new Date(); 
				//将date设置为过去的时间 
				date.setTime(date.getTime()-10000); 
				//将userId这个cookie删除 
				document.cookie="userId=828; expires="+date.toGMTString();  
				document.cookie="userName=828; expires="+date.toGMTString();  	
					

				})
				this.$store.commit("updateUserInfo","login")
				this.$store.commit("updateCartCount","")

				this.logoutFlag = false

			},
			startWrapCover(){
				this.wrapFlag = true
			}
				
			
			},
			
			components:{
				NavHeader:NavHeader,
				bread:bread,
				navfooter:navfooter,
				pricePannel:pricePannel,
				wrap:wrap
			}
	}
</script>