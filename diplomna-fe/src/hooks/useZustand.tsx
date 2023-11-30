import { create } from 'zustand'

type BearsState = {
    isUserAuth: boolean
    setIsUserAuth: (arg: boolean) => void;
  }

const useBearStore = create<BearsState>((set) => ({
  isUserAuth: false,
  setIsUserAuth: (args: boolean) => set({ isUserAuth: args})
}))

export default useBearStore;