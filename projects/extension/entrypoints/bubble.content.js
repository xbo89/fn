import { createApp } from 'vue';
import App from './Main.vue';
import './style.css'
export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'float-note-container',
      position: 'overlay', // 设置为固定定位
      zIndex: 1000,     // 设置 z-index
      alignment: 'top-right', // 设置对齐方式为右上角
      css: 'html,:root,:host{font-size: 16px;all: initial}',
      onMount: (container, shadow, shadowHost) => {
        // Define how your UI will be mounted inside the container
        const app = createApp(App);
        app.mount(container);
        console.log(shadow)
        shadowHost.style.cssText = 'position:absolute;top:0;left:0;z-index:998;    color: rgb(60, 64, 67);'
        shadow.children[0].style.cssText = 'position:absolute;top:0;left:0;'
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});