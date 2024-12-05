import { type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default {
  // base: '/calculadora-financeira/',
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
  },
} as UserConfig;

