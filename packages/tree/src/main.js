import { createApp } from 'vue'
import './style.css'
import App from './Playground.vue'
import ContextMenu from './contextmenu/index.js'

const app = createApp(App)
app.use(ContextMenu)
app.mount('#app')
