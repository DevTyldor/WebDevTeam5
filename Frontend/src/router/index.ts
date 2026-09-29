import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/sessions',
      name: 'Game Sessions',
      component: () => import('../pages/game sessions/SessionsListPage.vue'),
    },
    {
      path: '/new-session',
      name: 'New Session',
      component: () => import('../pages/game sessions/NewSessionPage.vue'),
    },
    {
      path: '/edit-session',
      name: 'Edit Session',
      component: () => import('../pages/game sessions/EditSessionPage.vue'),
    },
    {
      path: '/session-signup',
      name: 'Session Signup',
      component: () => import('../pages/game sessions/SessionSignupPage.vue'),
    },


    // Collections
    {
      path: '/collection',
      name: 'Collection',
      component: () => import('../pages/collections/Collections.vue'),
    },
    {
      path: '/collection/shelf',
      name: 'Shelf',
      component: () => import('../pages/collections/Shelf.vue'),
    },
    {
      path: '/collection/shelves',
      name: 'Shelves',
      component: () => import('../pages/collections/Shelves.vue'),
    },
    {
      path: '/collection/public-shelf',
      name: 'Public Shelf',
      component: () => import('../pages/collections/PublicShelf.vue'),
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: () => import('../pages/wishlist/Wishlist.vue'),
    }
  ],
})

export default router
