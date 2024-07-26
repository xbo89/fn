import Contextmenu from './index.vue'
import ContextmenuItem from './item.vue'
import ContextDevide from './divide.vue'

const contextmenuPlugin = {
  install(app, options) {
    app.component('FContextmenu', Contextmenu)
    app.component('FContextmenuItem', ContextmenuItem)
    app.component('FContextmenuDevide', ContextDevide)
    app.directive('contextmenu', {
      mounted: (el, binding) => {
        const { instance, value, arg } = binding
        const component = instance.$refs[arg]
        el.addEventListener('contextmenu', (ev) => {
          component.data = value
          component.position({
            x: ev.clientX,
            y: ev.clientY,
          })
          component.toggle(true)
        })
      },
    })
  },
}
export default contextmenuPlugin
