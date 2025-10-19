import type { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from 'src/helpers/isAuthenticated';
import { logoutUser } from 'src/helpers/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated() && to.name !== 'login') {
        next ('/login')
      } else {
        next()
      }

    },
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      {path: '', component: () => import('pages/StorefrontPage.vue')},
      { path: '/storefront', component: () => import('pages/StorefrontPage.vue') },
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: '/staff', component: () => import('pages/StaffPage.vue') },
      { path: '/customers', component: () => import('pages/CustomersPage.vue') },
      { path: '/items', component: () => import('pages/ItemsPage.vue') },
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
