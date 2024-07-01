import { User } from "firebase/auth";
import { create } from "zustand";

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
  studentsCount: number;
  setStudentsCount: (count: number) => void;
  studentsCheckList: string[];
  addStudentsCheckList: (check: string) => void;
  removeStudentsCheckList: (check: string) => void;
  resetStudentsCheckList: () => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  studentsCount: 0,
  setStudentsCount: (count) => set(() => ({ studentsCount: count })),
  studentsCheckList: [],
  addStudentsCheckList: (check) =>
    set((state) => ({
      studentsCheckList: [...state.studentsCheckList, check],
    })),
  removeStudentsCheckList: (check) =>
    set((state) => {
      const newCheckList = state.studentsCheckList.filter((id) => id !== check);
      return { studentsCheckList: newCheckList };
    }),
  resetStudentsCheckList: () => set(() => ({ studentsCheckList: [] })),
}));
