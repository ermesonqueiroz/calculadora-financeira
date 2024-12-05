import InflationView from '../views/InflationView.vue';
import HomeView from '../views/HomeView.vue';
import GrahamView from '../views/GrahamView.vue';

export const routes = [
  { path: '/', component: HomeView },
  { path: '/correcao-de-valor-pela-inflacao', component: InflationView },
  { path: '/formula-de-graham', component: GrahamView },
];