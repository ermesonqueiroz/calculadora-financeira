import { createWebHistory, createRouter } from 'vue-router';

import InflationView from '../views/InflationView.vue';
import HomeView from '../views/HomeView.vue';
import GrahamView from '../views/GrahamView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/correcao-de-valor-pela-inflacao', component: InflationView },
  { path: '/formula-de-graham', component: GrahamView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
