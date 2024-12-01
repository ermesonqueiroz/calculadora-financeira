import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'


createApp(App)
  .use(money, {precision: 4})
  .use(VueTheMask)
  .mount('#app')
