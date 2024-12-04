import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import { router } from './router'
import { createHead } from '@unhead/vue'

const head = createHead()

createApp(App)
  .use(money, { precision: 4 })
  .use(VueTheMask)
  .use(router)
  .use(head)
  .mount('#app')
