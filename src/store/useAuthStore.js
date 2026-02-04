import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      uid: null,
      setLogin: () => {
        const userLocalStorage = localStorage.getItem("uid");
        if (userLocalStorage) {
          set({ isLoggedIn: true, uid: userLocalStorage } );
        }
      },
      setLogout: () => {
        set({ isLoggedIn: false, uid: null });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;