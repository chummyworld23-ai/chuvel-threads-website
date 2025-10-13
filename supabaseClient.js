import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export const authService = {
  // ... other methods
  signInWithGoogle: async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Use the exact origin. Supabase will handle the /auth/callback part internally 
        // IF the root URL is set as allowed in the dashboard (e.g., http://localhost:3000/**).
        redirectTo: 'http://localhost:3000/' 
        
        // BETTER: Use window.location.origin for a dynamic approach (if running in a browser)
        // redirectTo: window.location.origin + '/'
      }
    })
  },
  // ...
}