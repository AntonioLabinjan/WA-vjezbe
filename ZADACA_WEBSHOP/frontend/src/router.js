import { createRouter, createWebHistory } from 'vue-router';
import ProductView from './views/ProductView.vue';
import Products from './components/Products.vue'
import Home from './components/Home.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/proizvodi/:id', component: ProductView, name: 'ProductView'},
  { path: '/proizvodi', component: Products, name: 'Products'}
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;