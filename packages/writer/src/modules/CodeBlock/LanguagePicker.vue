<template>
  <div class="bg-gradient-to-b from-white from-40% to-white/0 absolute inset-x-0 top-0 h-14 z-10 px-2 pt-3">
    <input type="text" placeholder="search language" class="border  rounded-full px-4 py-1 w-full text-sm"
      @mousedown.stop v-model="searchInput">
  </div>
  <simplebar class="inset-0" style="position:absolute">
    <div class="grid grid-cols-3 gap-px pt-14 px-2">
      <div
        class="lang-item inline-flex items-center space-x-2 hover:bg-gray-100 px-2 py-1.5 rounded-lg cursor-pointer text-sm cursor-pointer"
        v-for="(lang,index) in filteredLangs" @mousedown="changeLanguage(lang.name,lang.icon)">
        <i :class="[lang.icon,'text-xl w-4 h-4']"></i>
        <span>{{lang.name}}</span>
      </div>
      <div v-if="filteredLangs.length===0"> empty </div>
    </div>
  </simplebar>
</template>
<script setup>
  import { language } from './Language.js'
  import simplebar from 'simplebar-vue';
  import { ref, reactive, computed } from 'vue'

  const emits = defineEmits([
    'onselect',
  ])
  const searchInput = ref('')
  // const langs = reactive(language)
  const filteredLangs = computed(() => {
    const searchKeyword = searchInput.value.toLowerCase()
    // 对原数组进行过滤，返回名称匹配搜索输入的项
    return language.filter((lang) => lang.name.toLowerCase().includes(searchKeyword))
  })
  const changeLanguage = (language, languageIcon) => {
    emits('onselect', {
      language, languageIcon
    })
  }
</script>