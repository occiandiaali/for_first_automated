import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
