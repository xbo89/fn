<template>
  <MenubarRoot class="flex bg-white p-[3px] rounded-md shadow-[0_2px_10px] shadow-blackA7 ">
    <MenubarMenu value="heading">
      <MenubarTrigger
        class="py-2 px-3 outline-none select-none font-semibold leading-none rounded text-grass11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-green4 data-[state=open]:bg-green4">
        File
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] z-50"
          align="start" :side-offset="5" :align-offset="-3">
          <MenubarItem
            class="group text-[13px] leading-none text-grass11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-green9 data-[highlighted]:to-green10 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:text-green1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
            New Tab
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ T
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  </MenubarRoot>
</template>
<script setup>
  import { ref } from 'vue'
  defineProps({
    editor: {
      type: Object
    }
  })
  const listType = ['ordered', 'unordered']
  const currentMenu = ref('')
</script>
<style>

</style>