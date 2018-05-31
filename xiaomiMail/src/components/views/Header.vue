<template>
	<header>
		<a href="" class="logo">
			<img src="/static/img/logo.png" alt="">
		</a>
		<div class="login">
			<a href="javascript:void(0)" @click="haha">{{nickName}}</a>
			<a href="javascript:void(0)" @click="hehe" v-if="logoutFlag">LoginOut</a>
			<div class="numberSection">
				<a href="" id="#shopping">
				<svg class="icon haha" aria-hidden="true" id="jiantou">
				    <use xlink:href="#icon-gouwuche"></use>
				</svg>
				</a>
				<div class="number">{{carCount}}</div>

			</div>
			
			
		</div>
	</header>
</template>

<style type="text/css">
	 .numberSection{
	 	position:relative;

	 }
	.number{
		font-size:12px;
		color:white;
		display: flex;
		justify-content: center;
		align-items: center; 
		position: absolute;
		border-radius:50%;
		opacity: 0.7;
		width:20px;
		height:20px;
		background: red;
		left:60%;
		top:10%;
		transform: translate(-50%,0%);
	}
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
    #jiantou{
    	width:50px;
    	height: 50px;
    }
    .login{
    	display:flex;
    	justify-content: center;
    	align-items: center; 
    }
</style>

<script>

	export default{
		props:[
			"loginModalFlag",
			"loginName",
			"logoutFlag"
		],
		computed:{
			nickName(){
				return this.$store.state.nickName
			},
			carCount(){
				return this.$store.state.carCount
			}
		},
		methods:{
			haha(){
			 this.$emit("loginShow")
			},
			hehe(){
				this.$emit("loginOut")
			}
		}

	}
</script>