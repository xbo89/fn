<template>
  <div>
    <h1>Login</h1>
    <div class="border inline-block rounded-xl px-6 p-2 font-medium cursor-pointer" @click="startLogin">login with
      google</div>
  </div>
</template>
<script setup>
  import { createClient } from '@supabase/supabase-js'
  const supabase = createClient('https://enxogxbtvgjpbybgllxw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueG9neGJ0dmdqcGJ5YmdsbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3ODExMzksImV4cCI6MjAyOTM1NzEzOX0.ckGnzpi6sUf3XR4icHHZi5SEkdIzkDa_hXNJqqaoA2s')
  const startLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',

      options: {
        redirectTo: 'http://localhost:3000/login/',
        queryParams: {
          access_type: 'offline',  // 请求离线访问类型，以便获取刷新令牌
          prompt: 'consent',       // 强制显示同意屏幕，确保用户同意授予刷新令牌
        },
      },
    })
    console.log(data)
  }
  console.log(supabase.auth)
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)

    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  })
  const aa = await supabase.auth.getUser()
  console.log(aa)
  // http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6InlvUDNoQjM2L094aUg5Q2MiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE3MDgyMzE3LCJpYXQiOjE3MTcwNzg3MTcsImlzcyI6Imh0dHBzOi8vZW54b2d4YnR2Z2pwYnliZ2xseHcuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjlmZWZhZmYwLWRiY2EtNDUzMS04ZDFhLTFkZTRmNjFiOThjOCIsImVtYWlsIjoid2FuZ3dlbmJvLm1lQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSk1RVnU4Ym5aZHlnSDV3a1FTWDl3Y2FtbTFFMXZtRHBiSTZjTkJkcVMwd0xHWGp5UT1zOTYtYyIsImVtYWlsIjoid2FuZ3dlbmJvLm1lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiLnjovmlofljZoiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoi546L5paH5Y2aIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSk1RVnU4Ym5aZHlnSDV3a1FTWDl3Y2FtbTFFMXZtRHBiSTZjTkJkcVMwd0xHWGp5UT1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTAwMDA5ODc4NzY3NDExNzUxMzk1Iiwic3ViIjoiMTAwMDA5ODc4NzY3NDExNzUxMzk1In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTcwNzg3MTd9XSwic2Vzc2lvbl9pZCI6IjNiNDY0ODhjLTRjOTctNDVjNi1hMTQ2LTA4Y2E2NDQ1ZGM1ZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.b8oAl6CsFtqvb_h_rnXE3j0_dkKHAddptHuRktB3JpU&expires_at=1717082317&expires_in=3600&provider_token=ya29.a0AXooCgt-hGPFZID3CC9LcPkQ4G6IdoVENbXdXfE0gTZ8eDlPE01jVcIzO4WroBmfTOIKk8MkQ702cbIisSmA_dYzIib0YAS_HXvYM6px__fM_J2GgZrOhcNawU52BDfFATxJlwrOwT-uGGUJGsK26RJrzSWTYkC8hyQaaCgYKAZASARASFQHGX2MibsB8y9VvF-aV4E6--Qud1Q0171&refresh_token=rhgEY_XHad2xSsaQWH5zQw&token_type=bearer
</script>
<style>

</style>