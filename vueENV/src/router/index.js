import Vue from 'vue'
import Router from 'vue-router'
import Worker from '@/workerTest/worker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Worker',
      name: 'Worker',
      component: Worker
    }
  ]
})
