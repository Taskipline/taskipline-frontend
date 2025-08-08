import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

type AuthState = {
  accessToken: string | null
  user: User | null
  setAuth: (accessToken: string, user: User) => void
  setAccessToken: (accessToken: string) => void
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
      setAccessToken: (accessToken) => set((s) => ({ ...s, accessToken })),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
)
