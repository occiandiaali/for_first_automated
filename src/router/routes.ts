import type { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from 'src/helpers/isAuthenticated';
import { getUserRole, logoutUser } from 'src/helpers/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      // if (!isAuthenticated() && to.name !== 'login') {
      //   next ('/login')
      // } else {
      //   next()
      // }
      const userRole = getUserRole() || 'user'
      const requiredRoles = to.meta.roles as string[];
  if (!isAuthenticated() && to.name !== 'login') {
        next ('/login')
      } else if (isAuthenticated() && requiredRoles && !requiredRoles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }

    },
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {path: '', component: () => import('pages/StorefrontPage.vue'), meta: {roles: ['admin', 'sales', 'user']}},
      { path: '/storefront', component: () => import('pages/StorefrontPage.vue'), meta: { roles: ['admin', 'sales', 'user']} },
      { 
        path: '/dashboard', 
        component: () => import('pages/DashboardPage.vue'), 
        meta: { roles: ['admin']},
            beforeEnter: (to, from, next) => {
      const userRole = getUserRole() || 'user'
      const requiredRoles = to.meta.roles as string[];
  if (isAuthenticated() && requiredRoles && !requiredRoles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }

    },
       },
      { 
        path: '/staff', 
        component: () => import('pages/StaffPage.vue'), 
        meta: {roles: ['admin']},
                    beforeEnter: (to, from, next) => {
      const userRole = getUserRole() || 'user'
      const requiredRoles = to.meta.roles as string[];
  if (isAuthenticated() && requiredRoles && !requiredRoles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }

    },
       },
      { 
        path: '/customers', 
        component: () => import('pages/CustomersPage.vue'), 
        meta: { roles: ['admin', 'sales']},
                    beforeEnter: (to, from, next) => {
      const userRole = getUserRole() || 'user'
      const requiredRoles = to.meta.roles as string[];
  if (isAuthenticated() && requiredRoles && !requiredRoles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }

    },
       },
      {
         path: '/items', 
         component: () => import('pages/ItemsPage.vue'), 
         meta: { roles: ['admin']},
                     beforeEnter: (to, from, next) => {
      const userRole = getUserRole() || 'user'
      const requiredRoles = to.meta.roles as string[];
  if (isAuthenticated() && requiredRoles && !requiredRoles.includes(userRole)) {
        next('/unauthorized')
      } else {
        next()
      }

    },
         },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue')
  },
  {
    path: '/logout',
    redirect: () => {
      logoutUser();
      return '/login'
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('pages/UnauthorizedPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
