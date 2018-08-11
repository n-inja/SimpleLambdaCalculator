import Vue from 'vue'
import Router from 'vue-router'
import Lambda from '@/components/Lambda'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lambda',
      component: Lambda
    }
  ]
})
