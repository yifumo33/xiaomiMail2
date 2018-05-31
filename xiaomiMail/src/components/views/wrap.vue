<template>
	<div class="wrap">
		<div class="bread min-price">
						<div>
							<a href="javascript:void(0)">Default</a>
										<a href="javascript:void(0)">Price
											<svg class="icon" aria-hidden="true">
										    	<use xlink:href="#icon-plus-shiftdown"></use>
											</svg>
										</a>
						</div>
						
						<a href="javascript:void(0)" id="min-filter" v-on:click="show">FILTER</a>
				</div>	
			<div class="goodList">
				<div class="priceControl">
					<span>Sort by:</span>
					<a href="#" style="color:#ff7100 ">Default</a>
					<div class="Price">
						<a href="javascript:void(0)" @click="sortGoods">Price</a>
						<svg class="icon icon-arrow" aria-hidden="true" v-bind:class="{'sort-up':sortUp}" id="sort-up">
						    	<use xlink:href="#icon-plus-shiftdown"></use>
						</svg>
					</div>

				</div>
			
					<div class="goods">	
						<aside>
							<ol class="PriceFilter">
					

								<li>PRICE:</li>

								<li  @click="setPriceFilter('all')"    v-bind:class="{'cur':PriceCheck == 'all'}">All</li>
				
								<li v-for="(item,index) in priceFilter"   @click="setPriceFilter(index)"   v-bind:class="{'cur':PriceCheck == index }" >
									
								{{item.startPrice}} - {{item.endPrice}}
								
								</li>
							</ol>
						</aside>
						<main>
							<div class="pic" v-for="(item ,index) in goodlist">
								<img v-lazy="`${item.productImg}`" alt="">
								<div class="buy">
									<div class="imformation">
										<p>{{item.productName}}</p>
										<p class="good-price">{{item.productPrice}}</p>
									</div>
									
									<div class="buy-button" @click="addCart(item.productId)">加入购物车</div>
								</div>
							</div>
								
						</main>
						
					</div>

	<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" class="vue-loading">
			 <!-- <img src="./loading-cubes.svg" v-show="loading"> -->

	</div>

			</div>
	<modal v-show="loginAlterModal">
		<span slot="message">
			请先登录，否则无法加入购物车中
		</span>
		<a  href ="javascript:void(0)" slot="btn1" @click="haha">
			好的
		</a>
	</modal>

	<modal v-show="BuyAlterModal">
		<span slot="message">
			添加到购物车成功！
		</span>
		<a href="javascript:void(0)" slot="btn1" @click="haha">
			继续购物
		</a>

		<a href="#/cart" slot="btn1">
			查看购物车
		</a>
		<!-- <router-link slot="btn2">查看购物车</router-link>	 -->
	</modal>	
	</div>
</template>

<style>
	.cur{
		color:#ff6200;
		/*border-left: solid 3px #ff6200; */
	}
	.PriceFilter li:not(:first-of-type){
		cursor: pointer;
	}
	.sort-up{

		transform:rotate(180deg); 
		transition:all .3s ease-out;
	}
	.icon-arrow{
		transition:all .3s ease-out;
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
	import modal from '../modal'
	import axios from  'axios'
	export default{
		data(){
			return{
				goodlist:[],
				sortFlag:true,
				PriceCheck:'all',
				page:1,
				pageSize:8,
				busy:false,
				priceTag:true,
				sortUp:false,
				loginAlterModal:false,
				BuyAlterModal:false
			}
		},
		props:[
		 'priceFilter',
		 'priceLog'
		],
		methods:{
			show(e){
				e.preventDefault()
				e.stopPropagation()
				
			document.querySelector('.price-pannel').style.transition = "0.5s all"
			document.querySelector('#app').classList.add('shade')
			document.querySelector('.price-pannel').style.transform = "translateX(-100%)"
			},
			sortGoods(){
				this.sortFlag = !this.sortFlag 
				
				this.page=1
				
				
				this.goodlist.splice(0,this.goodlist.length)
				this.getdata(false)
				this.page++
				this.busy=false
				this.sortUp = !this.sortUp
				
				
				
			},
			getdata(flag){
				   var params= {
				   			PriceLevel:this.PriceCheck,
					    	page:this.page,
					    	pageSize:this.pageSize,
					    	sort:this.sortFlag?1:-1
			    		}	
			    		this.loading = true	
					axios.get("http://localhost:3000/goods",{
						params:params
					}).then((result)=>{	
						this.loading = true
						if(flag){
							console.log(result)
							this.goodlist = this.goodlist.concat(result['data'].result.list)
							if(result['data'].result.count == 0){
								this.busy = true	
							}else{
							this.busy = false
							}
						}else{
							this.goodlist = result['data'].result.list
							this.busy = false

						}	
					})
			},	
			loadMore(){
				this.busy = true;
		       	setTimeout(() => {
		       	console.log('haha')
		        this.getdata(true)
		        this.page++
		      }, 500);
			},
			setPriceFilter(index){
				this.goodlist.splice(0,this.goodlist.length)
				this.PriceCheck = index
				this.page = 1
				this.getdata(false)
				this.page++

			},
			addCart(productId){
				if(document.cookie){
					axios.post("http://localhost:3000/goods/addCart",{
					productId:productId
					}).then((res)=>{
						if(res.status==0){
							console.log('成功')
						}else{
							console.log("msg:" + res.msg)
						}
						console.log("这是添加购物车的结果")
						this.$store.commit("updateCartCount",res.data.result.cartList.length)
					})

					this.BuyAlterModal = true
					this.$emit('startWrapCover')
				}else{
				 this.loginAlterModal = true
				 this.$emit('startWrapCover')
				}
				
			},
			haha(){
				this.loginAlterModal = false
				this.BuyAlterModal = false
				this.$emit('closeLogin')

			}
			
		},
		components:{
				modal:modal
		}
	}
	
</script>