<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }"
    :ui="{width:'w-[220px]', item: { disabled: 'cursor-text select-text' } }">
    <UChip inset position="bottom-right">
      <UAvatar size="xs" :src="avatar_url" alt="Avatar" />
    </UChip>
    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as{{isDark}}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>
    <template #theme="{ item }">
      <div class="text-left inline-flex items-center space-x-1.5">
        <i :class="[isDark ? 'i-ri-sun-fill' : 'i-ri-moon-fill','text-xl text-gray-400 dark:text-gray-500']"></i>
        <span>{{isDark ? 'Light' : 'Dark'}}</span>
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
  const router = useRouter()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log(error)
    router.replace({ path: '/login' })
  }
  const items = ref([
    [{
      label: email,
      slot: 'account',
      disabled: true
    }], [{
      slot: 'theme',
      click: () => {
        isDark.value = !isDark.value
      }
    }], [{
      label: 'Landing Page',
      icon: 'i-ri-global-fill',
      click: () => {
        router.push({ path: '/' })
      }
    }, {
      label: 'Changelog',
      icon: 'i-ri-notification-badge-fill'
    }], [{
      label: 'LogOut',
      icon: 'i-ri-logout-circle-r-fill',
      click: () => {
        signOut()
      }
    }]
  ])
</script>