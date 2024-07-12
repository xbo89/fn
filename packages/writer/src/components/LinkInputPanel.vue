<template>
  <Teleport to="body">
    <MenuPopper class="link-input-panel flex w-fit " ref="floating" :style="floatingStyles">
      <input type="text" placeholder="input url"
        class="relative block w-72 disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        v-model="linkUrl" @mousedown.stop />
      <BubbleToggleButton icon="i-ri-arrow-right-line" @mousedown="setLink" />
    </MenuPopper>
  </Teleport>
</template>
<script setup>
  import { ref } from 'vue'
  import BubbleToggleButton from '@/components/BubbleToggleButton.vue'
  import MenuPopper from '@/components/MenuPopper.vue'
  import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    limitShift
  } from '@floating-ui/vue';


  const props = defineProps({
    editor: {
      type: Object
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  })

  const linkUrl = ref('')

  const reference = ref(null);
  const floating = ref(null);

  const { state } = props.editor.view
  const { from, to } = state.selection
  const start = props.editor.view.domAtPos(from);
  const end = props.editor.view.domAtPos(to);
  // 创建一个 Range 对象
  const range = document.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);

  reference.value = {
    getBoundingClientRect: () => range.getBoundingClientRect(),
    getClientRects: () => range.getClientRects()
  }

  const { floatingStyles } = useFloating(reference, floating, {
    placement: props.placement,
    middleware: [
      offset(6),
      shift({
        crossAxis: false,
        padding: 16
      })
    ],
    whileElementsMounted: autoUpdate,
  });

  const setLink = () => {
    // const previousUrl = props.editor.getAttributes('link').href
    // const url = window.prompt('URL', previousUrl)
    console.log(isValidUrl(linkUrl.value))
    if (!isValidUrl(linkUrl.value)) return false
    const url = linkUrl.value

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

      return
    }

    // update link
    props.editor
      .chain()
      .focus()
      .setLink({ href: url })
      .run()
  }
  // https://www.freecodecamp.org/chinese/news/how-to-validate-urls-in-javascript/
  const isValidUrl = (url) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return !!pattern.test(url);
  }
</script>