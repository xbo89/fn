import { createApp } from 'vue'
import './lib/style.css'
import App from './Playground.vue'
import NoteCanvas from './index.js'

const app = createApp(App)

app.use(NoteCanvas)
app.mount('#app')
