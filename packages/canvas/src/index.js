import { createPinia } from 'pinia'
import TheCanvas from './lib/TheCanvas.vue'
import TheContextMenu from './lib/TheContextMenu.vue'
import TheMenuItem from './lib/TheMenuItem.vue'
import TheMenuColorsItem from './lib/TheMenuColorsItem.vue'
import TheCardContainer from './lib/TheCardContainer.vue'
import TheGroup from './lib/TheCards/TheGroup.vue'
import TheWriter from './lib/TheCards/TheWriter.vue'
import TheMenuDivide from './lib/TheMenuDivide.vue'

export default {
  install(app) {
    app.component('TheCanvas', TheCanvas)
    app.component('TheContextMenu', TheContextMenu)
    app.component('TheMenuItem', TheMenuItem)
    app.component('TheMenuColorsItem', TheMenuColorsItem)
    app.component('TheCardContainer', TheCardContainer)
    app.component('TheGroup', TheGroup)
    app.component('TheWriter', TheWriter)
    app.component('TheMenuDivide', TheMenuDivide)
    app.use(createPinia())
  },
}
