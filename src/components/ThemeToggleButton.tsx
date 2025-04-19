"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
