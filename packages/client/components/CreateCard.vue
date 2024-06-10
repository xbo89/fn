<template>
  <DialogRoot>
    <DialogTrigger>
      <FnButton icon="ri-add-line" class="text-blue-600">
        New Card
      </FnButton>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-white/70 fixed inset-0 z-30" />
      <DialogContent
        class="fixed top-1/2 left-1/2 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-3 focus:outline-none z-50 border border-gray-300 min-h-[720px]"
        :disableOutsidePointerEvents="true" @interact-outside="event => {
          return event.preventDefault()
        }">
        <div class="flex items-center justify-between mb-2">
          <DialogTitle class="text-base font-medium">
            New Card
          </DialogTitle>
          <div class="flex space-x-1">
            <DropdownMenuRoot>
              <DropdownMenuTrigger class="" aria-label="Customise options">
                <FnButton icon="ri-more-line"></FnButton>
              </DropdownMenuTrigger>

              <DropdownMenuPortal>
                <DropdownMenuContent class="text-sm border bg-white rounded-xl p-1 min-w-40 z-50" :side-offset="5"
                  align="end" :alignOffset="-8">
                  <DropdownMenuItem value="New Tab"
                    class="px-2 py-1 cursor-pointer rounded-lg items-center grid grid-cols-6 gap-1">
                    <div class="bg-gray-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-blue-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-yellow-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-red-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-green-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-gray-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-gray-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-gray-100 w-6 h-6 rounded-lg"></div>
                    <div class="bg-gray-100 w-6 h-6 rounded-lg"></div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator class="h-px bg-gray-200 my-1" />
                  <DropdownMenuItem value="New Tab"
                    class="px-2 py-1 hover:bg-red-100 cursor-pointer rounded-lg  items-center space-x-2 text-gray-600 hover:text-red-600"
                    @click="signOut">
                    <i class="ri-delete-bin-line  text-gray-400 text-base"></i>
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenuRoot>
            <FnButton icon="ri-save-line">Save</FnButton>
            <FnButton icon="ri-picture-in-picture-exit-line" class="text-blue-600">Save & Close</FnButton>
          </div>
          <!-- <DialogClose class="inline-flex items-center justify-center" aria-label="Close">
            <i class="ri-close-line text-xl"></i>
          </DialogClose> -->
        </div>
        <Writer />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
<script setup>
  import { Writer } from '@floatnote/writer'
</script>