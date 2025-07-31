import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// You can expand this type later based on your actual user data
export type User = {
  id: string
  email: string
}

type AuthState = {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // unique name for the localStorage item
      storage: createJSONStorage(() => localStorage),
    }
  )
)
