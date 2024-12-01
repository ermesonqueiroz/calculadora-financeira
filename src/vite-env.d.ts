/// <reference types="vite/client" />

declare module 'v-money' {
  import money, { VMoney } from 'v-money';
  export default money;
  export { VMoney };
}

declare module 'vue-the-mask' {
  import VueTheMask from 'vue-the-mask';
  export default VueTheMask;
}
