import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'

import store from "@/store";


Vue.use(Router)

function isAuthorized(to, from, next) {
  store.dispatch('CHECK_SESSION', store.state.user_session.user.username)
    .then(result => {
      if (result.status === 2) {
        //leaving breadcrumbs behind    
        store.commit('DROP_BREADCRUMBS', {
          name: to.name,
          href: to.path
        })
        next()
      } else {
        next("/app")
      }
    })
    .catch(err => {
      next("/app")
    })
}

function isAuthenticated(to, from, next) {
  console.log('isAuth: ' + store.state.user_session.isAuthenticated);
  
  if (store.state.user_session.isAuthenticated) {
    next('/app');
  } else {
    next()
  }
}

function isActiveSession(to, from, next) {
  if (!store.state.user_session.isAuthenticated) {
    next("/");
  } else {
    store.commit('DROP_BREADCRUMBS', {
      name: to.name,
      href: to.path
    })
    next();
  }
}

function dropBreadcrumbs(to, from, next) {
  store.commit('DROP_BREADCRUMBS', {
    name: to.name,
    href: to.path
  })
  next();
}



var router = new Router({
  routes: [{
      path: '/',
      component: MainLayout,
      children: [{
          path: '',
          name: 'Login',
          component: () => import('@/views/Login.vue')
        },
        {
          path: '/recovery',
          name: 'Account Recovery',
          component: () => import('@/views/Recovery.vue')
        }
      ]

    },
    {
      path: '/app',
      component: UserLayout,
      beforeEnter: isActiveSession,
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/app/Dashboard.vue'),
        },
        {
          path: 'licenses',
          name: 'Licenses',
          component: () => import('@/views/app/licenses/Licenses.vue'), 
        },
        {
          path: 'licenses/new',
          name: 'License Application Form',
          component: () => import('@/views/app/licenses/apply/ApplicationForm.vue'), 
        },
        {
          path: 'payments',
          name: 'Cashier',
          component: () => import('@/views/app/payments/Cashier.vue'), 
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/app/Profile.vue'), 
        }
      ]

    }
  ]
})


export default router