<template>
  <div class="w-96 h-66 bg-white rounded-lg border border-slate-6 shadow-lg z-50 text-gray-700 overflow-hidden">
    <div class="grid grid-cols-9 gap-0 text-center border-b border-slate-6 ">
      <div v-for="(i, index) in emojiCate" :key="index"
        class="flex justify-center items-center h-9 hover:bg-indigo-3 cursor-pointer w-full m-0 active:bg-indigo-4"
        :class="
          activeIndex === index
            ? ' text-indigo-9 hover:bg-indigo-3 border-b-2 border-indigo-9'
            : ''
        " @mousedown.prevent="scroll(index)">
        <div :class="[i.icon]" class="text-xl" />
      </div>
    </div>

    <simplebar ref="scrollbar" data-simplebar-auto-hide="false" data-simplebar-forceVisible="y"
      :style="{ height: 230 + 'px' }">
      <div class="emoji-container">
        <div v-for="(group,index) in EmojiData" :key="'group-'+index">
          <div ref="emojiTitle" class="sticky top-0 text-sm bg-gray-100/80 py-1 px-2 backdrop-blur">
            {{ group.name }}
          </div>
          <div class="grid grid-cols-9 gap-2 text-center text-2xl mx-2">
            <div v-for="(e,i) in group.emojis" v-show="e.unicode_version !== '15.0'" :key="'emoji-'+i"
              class="inline-flex justify-center items-center hover:bg-primary-100 active:bg-indigo-4 rounded-lg cursor-pointer"
              @mousedown.prevent="selectEmoji($event, e.emoji)">
              {{ e.emoji }}
            </div>
          </div>
        </div>
      </div>
    </simplebar>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue'
  import EmojiData from './EmojiPanel.json'
  import simplebar from 'simplebar-vue'

  const emojiCate = ref([
    { icon: 'i-ri-emotion-happy-line' },
    { icon: 'i-material-symbols:emoji-people-rounded' },
    { icon: 'i-ri-cake-3-line' },
    { icon: 'i-material-symbols:emoji-food-beverage-outline-rounded' },
    { icon: 'i-material-symbols:card-travel-outline-rounded' },
    { icon: 'i-material-symbols:local-activity-outline-rounded' },
    { icon: 'i-material-symbols:emoji-objects-outline-rounded' },
    { icon: 'i-material-symbols:emoji-symbols-rounded' },
    { icon: 'i-material-symbols:flag-outline-rounded' }
  ])
  const emojiTitle = ref(null)
  const emojiGroupOffset = ref([])
  const scrollbar = ref(null)
  const activeIndex = ref(0)
  const emits = defineEmits(['selectEmoji'])
  onMounted(() => {
    scrollbar.value.SimpleBar.getScrollElement().addEventListener(
      'scroll',
      scrollAndSyncTab
    )
  })
  const scrollAndSyncTab = () => {
    emojiTitle.value.forEach((item) => {
      emojiGroupOffset.value.push(item.offsetTop)
    })
    const scrollTop = scrollbar.value.SimpleBar.getScrollElement().scrollTop
    for (let i = 0; i < emojiGroupOffset.value.length; i++) {
      if (scrollTop < emojiGroupOffset.value[i]) {
        activeIndex.value = i - 1
        break
      }
    }
  }
  const scroll = (index) => {
    activeIndex.value = index
    scrollbar.value.SimpleBar.getScrollElement().scrollTop =
      emojiGroupOffset.value[index]
  }
  const selectEmoji = (e, emoji) => {
    emits('selectEmoji', emoji)
  }
  // const selectEmoji = (e, emoji) => {
  //   store.emojiPanel.display = false
  //   const { border, textColor, background } = store.callout.attrs
  //   const { state, dispatch } = view
  //   const tr = state.tr.setNodeMarkup(
  //     store.emojiPanel.pos,
  //     state.schema.nodes.callout,
  //     {
  //       border,
  //       textColor,
  //       background,
  //       emoji
  //     }
  //   )
  //   dispatch(tr)
  // }
</script>