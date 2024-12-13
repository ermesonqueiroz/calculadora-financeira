import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default {
  // base: '/calculadora-financeira/',
  plugins: [
    vue(),
    VueRouter({
      extensions: ['.vue'],
      dts: 'src/typed-router.d.ts',
    })
  ],
  ssgOptions: {
    script: 'async',
  },
} as UserConfig;

