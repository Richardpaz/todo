import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === "light" ? "dark" : "light";

      localStorage.setItem("theme", newTheme);
      document.documentElement.className = newTheme;

      return { theme: newTheme };
    }),
}));