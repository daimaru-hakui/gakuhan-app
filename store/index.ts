import { User } from "firebase/auth";
import { create } from "zustand";

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
}


export const useStore = create<State>(set => ({
  user: null,
  setUser: (user) => set(state => ({ user: user })),
}));