<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger class="" aria-label="Customise options">
      <AvatarRoot
        class="bg-blackA3 inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarImage class="h-full w-full object-cover" :src="avatar_url" :alt="name" />
        <AvatarFallback
          class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          :delay-ms="600">
          CT
        </AvatarFallback>
      </AvatarRoot>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent class="text-sm border bg-white rounded-xl p-1 min-w-40" :side-offset="5" align="end"
        :alignOffset="-8">
        <DropdownMenuItem value="User Infomation" class="px-2 py-1 rounded-lg flex items-center space-x-2">
          <i class="ri-google-line text-gray-400 text-base"></i>
          <div>
            <span class="font-medium">{{name}}</span>
            <p class="text-xs text-gray-400">{{email}}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-px bg-gray-200 my-1" />
        <DropdownMenuItem value="New Tab"
          class="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center space-x-2"
          @click="handleClick">
          <i class="ri-settings-line text-gray-400 text-base"></i>
          <span>Setting</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator class="h-px bg-gray-200 my-1" />
        <DropdownMenuItem value="New Tab"
          class="px-2 py-1 hover:bg-red-100 cursor-pointer rounded-lg  items-center space-x-2 text-gray-600 hover:text-red-600"
          @click="signOut">
          <i class="ri-logout-box-r-line  text-gray-400 text-base"></i>
          <span>LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
<script setup>
  import {
    DropdownMenuArrow,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuItemIndicator,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuRoot,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    AvatarFallback, AvatarImage, AvatarRoot
  } from 'radix-vue'

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { user_metadata: { avatar_url, name, email } } = user.value
  const toggleState = ref(false)
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
  }
</script>