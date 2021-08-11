import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store';

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: requireAuth,
    children: [{
      path: 'employees',
      name: 'employeeslist',
      component: () => import(/* webpackChunkName: "employeeslist" */ '../components/employees/list.vue')
    }, {
      path: 'employees/form',
      name: 'employeesform',
      component: () => import(/* webpackChunkName: "employeesform" */ '../components/employees/create.vue')
    }, {
      path: 'employees/:id',
      name: 'employeesProfile',
      component: () => import(/* webpackChunkName: "employeesProfile" */ '../components/employees/profile.vue')
    }, {
      path: 'requests',
      name: 'requestslist',
      component: () => import(/* webpackChunkName: "requestslist" */ '../components/requests/list.vue')
    }, {
      path: 'reviews',
      name: 'reviewsList',
      component: () => import(/* webpackChunkName: "reviewsList" */ '../components/reviews/list.vue')
    }, {
      path: 'review/:id',
      name: 'reviewPage',
      component: () => import(/* webpackChunkName: "reviewPage" */ '../components/reviews/edit.vue')
    }]
  },
  {
    path: '/pending',
    beforeEnter: requireAuth,
    component: () => import(/* webpackChunkName: "pendingrequest" */ '../views/pending.vue'),
    children: [{
      path: '',
      name: 'pendingrequest',
      component: () => import(/* webpackChunkName: "todo" */ '../components/requests/todo.vue')
    },
    {
      path: ':id',
      name: 'submitreview',
      component: () => import(/* webpackChunkName: "submitreview" */ '../components/requests/submit.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: isLoggedOut,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



function requireAuth(to, from, next) {
  if (to.name !== from.name) {
    if (!store.getters.getLoginStatus) {
      next('/login');
    } else {
      next();
    }
  }
}

function isLoggedOut(to, from, next) {
  if (to.name !== from.name) {
    if (store.getters.getLoginStatus) {
      next('/');
    } else {
      next();
    }
  }
}

export default router
