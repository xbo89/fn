<template>

  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
    <UAvatar size="xs" :src="avatar_url" alt="Avatar" />
  </UDropdown>

</template>
<script setup>


  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { user_metadata: { avatar_url, name, email } } = user.value
  const toggleState = ref(false)
  const items = [
    [{
      label: name,
      avatar: {
        src: avatar_url
      }
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