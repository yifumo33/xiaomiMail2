import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodList from '@/components/views/GoodList'
import cart from '@/components/views/cart'
import address from '@/components/views/address'
import checkOrder from '@/components/views/checkOrder'
import orderSuccess from '@/components/views/orderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },{
    	path:'/cart',
    	name:'cart',
    	component:cart
    },{
      path:'/address',
      name:'address',
      component:address
    },{
      path:'/checkOrder',
      name:'checkOrder',
      component:checkOrder
    },{
      path:'/orderSuccess',
      name:'orderSuccess',
      component:orderSuccess
    }
  ]
})
