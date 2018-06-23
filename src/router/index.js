import Vue from 'vue'
import Router from 'vue-router'
import UserApp from '@/components/UserApp'
//import VueResource from 'vue-resource'

Vue.use(Router)
//Vue.use(VueResource);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/user',
      name: 'UserApp',
      component: UserApp
    }
  ]
})
