// src/lib/authService.ts
import { supabase } from './supabase'

export const authService = {
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),

  signUp: (email: string, password: string) =>
    supabase.auth.signUp({ email, password }),

  signInWithGoogle: () =>
    supabase.auth.signInWithOAuth({ provider: 'google' }),

  signOut: () =>
    supabase.auth.signOut(),
}
