import { Student } from "@/utils/student.interface";
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
  allCheckStudentsCheckList: (checks: Student[]) => void;
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
  allCheckStudentsCheckList: (students) =>
    set(() => {
      const studentIds = students.map((student) => student.id);
      return {
        studentsCheckList: studentIds,
      };
    }),
}));
