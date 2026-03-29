import { createPhaserVue } from '@onmax/phaser-vue'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(createPhaserVue({ debug: true }))
  .mount('#app')
