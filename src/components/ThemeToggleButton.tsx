"use client";

import { useTheme } from "@/context/ThemeContext";
import Switch from "@mui/material/Switch";
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <span className="fixed top-4 right-4 z-20" title="Toggle Theme">
      <Switch {...label} onChange={toggleTheme} /> {}
      {/* {theme === "dark" ? "☀️" : "🌙"} */}
    </span>
  );
}
