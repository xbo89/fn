<template>

  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }"
    :ui="{ item: { disabled: 'cursor-text select-text' } }">
    <UChip inset position="bottom-right">
      <UAvatar size="xs" :src="avatar_url" alt="Avatar" />
    </UChip>
    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium *:text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>
  </UDropdown>

</template>
<script setup>


  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { user_metadata: { avatar_url, name, email } } = user.value
  const toggleState = ref(false)
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
  const items = [
    [{
      label: email,
      slot: 'account',
      disabled: true
    }], [{
      label: isDark.value ? 'Dark' : 'Light',
      icon: isDark.value ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid',
      click: () => {
        isDark.value = !isDark.value
      }
    }], [{
      label: 'Changelog',
      icon: 'ri-book-read-line'
    }], [{
      label: 'LogOut',
      icon: 'ri-logout-box-r-line'
    }]
  ]
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
  }


</script>