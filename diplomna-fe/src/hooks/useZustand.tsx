import { create } from 'zustand'

type AuthState = {
    isUserAuth: boolean
    setIsUserAuth: (arg: boolean) => void;
  }

const useAuthStore = create<AuthState>((set) => ({
  isUserAuth: false,
  setIsUserAuth: (args: boolean) => set({ isUserAuth: args})
}))

export default useAuthStore;