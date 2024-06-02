import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://enxogxbtvgjpbybgllxw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueG9neGJ0dmdqcGJ5YmdsbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3ODExMzksImV4cCI6MjAyOTM1NzEzOX0.ckGnzpi6sUf3XR4icHHZi5SEkdIzkDa_hXNJqqaoA2s');
// https://github.com/orgs/supabase/discussions/2532
export default defineEventHandler(async (event) => {
  // const data = supabase.auth.signInWithOAuth({
  //   provider: 'google',
  //   options: {
  //     redirectTo: 'https://localhost:3000/login',
  //   },
  // })
  console.log(await supabase.auth.getUser())
})