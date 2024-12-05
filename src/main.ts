import App from './App.vue'
import { routes } from './router'
import { ViteSSG } from 'vite-ssg'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes }
);
