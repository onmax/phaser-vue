import { createApp } from 'vue'
import { createPhaserVue } from '@onmax/phaser-vue'
import App from './App.vue'

createApp(App).use(createPhaserVue()).mount('#app')
