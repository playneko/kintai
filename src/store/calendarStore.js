import { create } from "zustand";
import dayjs from "dayjs";

const useCalendarStore = create((set) => ({
  thisDate: dayjs().toString(),
  inputDate: '',
  inputStart: '10:30',
  inputEnd: '19:00',
  inputReset: '1:00',
  inputProduction: '社内業務支援ツールの開発',
  inputRemarks: '',
  isUpdated: false,
  setThisDate: (date) => set((state) => ({ ...state, thisDate: date })),
  setInputDate: (date) => set((state) => ({ ...state, inputDate: date })),
  setInputStart: (start) => set((state) => ({ ...state, inputStart: start })),
  setInputEnd: (end) => set((state) => ({ ...state, inputEnd: end })),
  setInputReset: (reset) => set((state) => ({ ...state, inputReset: reset })),
  setInputProduction: (production) =>
    set((state) => ({ ...state, inputProduction: production })),
  setInputRemarks: (remarks) =>
    set((state) => ({ ...state, inputRemarks: remarks })),
  setIsUpdated: (isUpdated) => set((state) => ({ ...state, isUpdated: isUpdated })),
}));

export default useCalendarStore;