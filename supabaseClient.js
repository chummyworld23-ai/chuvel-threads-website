import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const authService = {
  // ... other methods
  signInWithGoogle: async () => {
    // Automatically detect correct domain (localhost or Vercel)
    const redirectTo =
      typeof window !== 'undefined'
        ? window.location.origin + '/'
        : import.meta.env.VITE_SITE_URL || 'http://localhost:3000/'

    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    })
  },
  // ...
}
