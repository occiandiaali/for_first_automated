import type { RouteRecordRaw } from 'vue-router';
import { logoutUser } from 'src/helpers/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/StorefrontPage.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'sales', 'user'] },
      },
      {
        path: 'storefront',
        component: () => import('pages/StorefrontPage.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'sales', 'user'] },
      },
      {
        path: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'staff',
        component: () => import('pages/StaffPage.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'customers',
        component: () => import('pages/CustomersPage.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'sales'] },
      },
      {
        path: 'items',
        component: () => import('pages/ItemsPage.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/help',
        component: () => import('pages/HelpPage.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'sales', 'user'] },
      },
    ],
  },

  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
  },
  {
    path: '/logout',
    redirect: () => {
      logoutUser();
      return '/login';
    },
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('pages/UnauthorizedPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
