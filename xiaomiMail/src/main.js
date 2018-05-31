// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueSimpleSVG from 'vue-simple-svg'
import {currency} from './util/currency.js'
import Vuex from 'vuex'


Vue.use(Vuex)

Vue.use(VueSimpleSVG)

Vue.use(infiniteScroll)

Vue.filter("currency",currency)

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(VueLazyload,{
	loading:"./../static/loading-svg/loading-bars.svg"
})

const store = new Vuex.Store({
	state:{
		nickName:'login',
		carCount:'0'
	},
	mutations:{
		updateUserInfo(state,nickName){
			state.nickName = nickName
		},
		updateCartCount(state,carCount){
			state.carCount = carCount
		},
		addCartCount(state,carCount){
			state.carCount++
		},
		reduceCartCount(state,carCount){
			state.carCount--
		}
	}
})


new Vue({
  el: '#app', //
  router,
  store,
  components: { App },
  template: '<App/>'
})
/*
new Vue({
	router,
	components:{ App }
	render:h=>(){
	
	}
}).$mount("#app")
*/