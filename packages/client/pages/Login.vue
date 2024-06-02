<template>
  <div class="login w-full h-full flex justify-center items-center bg-gray-100">
    <div class="login-container border rounded-2xl flex-col items-center inline-flex p-8 bg-white space-y-2">
      <h1 class="text-2xl font-bold w-full">FloatNote Login</h1>
      <div>
        <span class="text-sm text-gray-400">login with:</span>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-100"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 262">
              <path fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
              <path fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
              <path fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
              <path fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
            </svg>
            <span>Google</span>
          </div>
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-50"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128">
              <g fill="#181616">
                <path fill-rule="evenodd"
                  d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  clip-rule="evenodd" />
                <path
                  d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0" />
              </g>
            </svg>
            <span>Github</span>
          </div>
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-50"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128">
              <path
                d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z" />
            </svg>
            <span>Twitter</span>
          </div>
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-50"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128">
              <rect width="118.35" height="118.35" x="4.83" y="4.83" fill="#3d5a98" rx="6.53" ry="6.53" />
              <path fill="#fff"
                d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A127 127 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z" />
            </svg>
            <span>Facebook</span>
          </div>
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-50"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128">
              <path fill="#E24329"
                d="m124.755 51.382l-.177-.452L107.47 6.282a4.46 4.46 0 0 0-1.761-2.121a4.58 4.58 0 0 0-5.236.281a4.6 4.6 0 0 0-1.518 2.304L87.404 42.088H40.629L29.077 6.746a4.5 4.5 0 0 0-1.518-2.31a4.58 4.58 0 0 0-5.236-.281a4.5 4.5 0 0 0-1.761 2.121L3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046l.157.111l26.061 19.516l12.893 9.758l7.854 5.93a5.28 5.28 0 0 0 6.388 0l7.854-5.93l12.893-9.758l26.218-19.634l.065-.052c11.273-8.526 15.562-23.472 10.524-36.677" />
              <path fill="#FC6D26"
                d="m124.755 51.382l-.177-.452a57.8 57.8 0 0 0-23.005 10.341L64 89.682c12.795 9.68 23.934 18.09 23.934 18.09l26.218-19.634l.065-.052c11.291-8.527 15.586-23.488 10.538-36.704" />
              <path fill="#FCA326"
                d="m40.066 107.771l12.893 9.758l7.854 5.93a5.28 5.28 0 0 0 6.388 0l7.854-5.93l12.893-9.758s-11.152-8.436-23.947-18.09a18379 18379 0 0 0-23.935 18.09" />
              <path fill="#FC6D26"
                d="M26.42 61.271A57.7 57.7 0 0 0 3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046l.157.111l26.061 19.516L64 89.655z" />
            </svg>
            <span>Gitlab</span>
          </div>
          <div
            class="border rounded-xl px-6 p-2 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-50"
            @click="testFetch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128">
              <path fill="#0acf83"
                d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0" />
              <path fill="#a259ff" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0" />
              <path fill="#f24e1e" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0" />
              <path fill="#ff7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0" />
              <path fill="#1abcfe"
                d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0" />
            </svg>
            <span>Figma</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const projectURL = 'enxogxbtvgjpbybgllxw.supabase.co'
  const redirectURL = encodeURI('http://localhost:3000/login/')
  const loginWidthGoogle = () => {
    window.location = `https://${projectURL}/auth/v1/authorize?provider=google&redirect_to=${redirectURL}`
  }

  const testFetch = async () => {
    const data = await $fetch('/api-v1/auth/signwithgoogle')
    console.log(data)
    window.location = data.url
  }

  // testFetch()

  // const route = useRoute()

  // const hash2Object = () => {
  //   const hash = route.hash
  //   if (hash.toString() !== '') {
  //     const hashArr = hash.replace(/^#/, '').split('&')
  //     const params = {}
  //     for (let i = 0; i < hashArr.length; i++) {
  //       const arr = hashArr[i].split('=')
  //       params[arr[0]] = arr[1]
  //     }
  //     localStorage.setItem('jwt', params)
  //     return params
  //   }
  // }
  // hash2Object()
  // onMounted(() => {
  //   console.log(localStorage.getItem('jwt'))
  // })
</script>
<style>

</style>