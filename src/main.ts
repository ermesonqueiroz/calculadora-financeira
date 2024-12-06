import App from './App.vue'
import { routes } from './router'
import { ViteSSG } from 'vite-ssg'
import VueGtag, { pageview } from 'vue-gtag';
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router }) => {
    app.use(VueGtag, {
      config: {
        id: import.meta.env.VITE_GOOGLE_GTAG_ID
      }
    });
    
    router.beforeEach(({ path: page_path }) => {
      pageview({ page_path });
    });
  }
);
