"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",

      toggleTheme: () => {
        const newTheme =
          get().theme === "light" ? "dark" : "light"

        document.documentElement.className = newTheme

        set({ theme: newTheme })
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)