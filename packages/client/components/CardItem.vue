<template>
  <div class="card-item border hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer  min-h-72 relative group">
    <div class="">{{data.schema}}</div>
    <div class="flex space-x-1 mt-2">
      <span v-for="(tag,index) in data.tags"
        class="text-xs px-2 py-1 bg-gray-200 rounded-lg text-gray-400">{{tag}}</span>
    </div>
    <DropdownMenuRoot>
      <DropdownMenuTrigger
        class="border bg-white rounded-lg w-8 h-8 items-center justify-center absolute right-4 bottom-4 opacity-0 inline-flex group-hover:opacity-100 hover:bg-gray-100"
        aria-label="Customise options" asChild>
        <i class="ri-more-2-line"></i>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent class="text-sm border bg-white rounded-xl p-1 min-w-40" align="end" side="top">
          <DropdownMenuItem value="New Tab"
            class="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center space-x-2"
            @click="handleClick">
            <i class="ri-git-merge-line text-gray-400 text-base"></i>
            <span>Connection</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="h-px bg-gray-200 my-1" />
          <DropdownMenuItem value="New Tab"
            class="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center space-x-2"
            @click="handleClick">
            <i class="ri-edit-box-line text-gray-400 text-base"></i>
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem value="New Tab"
            class="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center space-x-2"
            @click="handleClick">
            <i class="ri-file-copy-line text-gray-400 text-base"></i>
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="h-px bg-gray-200 my-1" />
          <DropdownMenuItem value="New Tab"
            class="px-2 py-1 hover:bg-red-100 cursor-pointer rounded-lg  items-center space-x-2 text-gray-600 hover:text-red-600"
            @click="signOut">
            <i class="ri-logout-box-r-line  text-gray-400 text-base"></i>
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>

</template>
<script setup>
  defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const toggleState = ref(false)
</script>