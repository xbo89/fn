<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm"><i class="ri-add-line mr-2" /> New Card</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Card</DialogTitle>
      </DialogHeader>
      <div class="flex space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="sm"><i class="ri-add-line mr-2" /> New Card</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
            <DropdownMenuItem>
              <i class="ri-delete-bin-line  text-gray-400 text-base"></i>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <!-- <DropdownMenuRoot>
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
        </DropdownMenuRoot> -->
        <FnButton icon="ri-save-line">Save</FnButton>
        <FnButton icon="ri-picture-in-picture-exit-line" class="text-blue-600">Save & Close</FnButton>
      </div>
      <VMenu>
        <button>Documentation</button>

        <template #popper>
          <button>Guide</button>
          <button>API Reference</button>
        </template>
      </VMenu>
      <Writer />
    </DialogContent>
  </Dialog>

</template>
<script setup>
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
  import { Writer } from '@floatnote/writer'
</script>