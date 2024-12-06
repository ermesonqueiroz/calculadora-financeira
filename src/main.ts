import App from './App.vue'
import { routes } from './router'
import { ViteSSG } from 'vite-ssg'
import VueGtag from 'vue-gtag';
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.use(VueGtag, {
      config: {
        id: import.meta.env.VITE_GOOGLE_GTAG_ID
      }
    });
  }
);
