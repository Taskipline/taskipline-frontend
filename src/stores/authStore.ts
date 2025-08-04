import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'

// You can expand this type later based on your actual user data
export type User = {
  id: string
  email: string
}

type AuthState = {
  accessToken: string | null
  user: User | null
  setAuth: (accessToken: string, user: User) => void
  logout: () => void
}

const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, { expires: 7, path: '/' })
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: '/' })
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (accessToken, user) => set({ accessToken, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
)
