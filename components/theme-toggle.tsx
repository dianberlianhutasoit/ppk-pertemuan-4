"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("duitku-theme="))
      ?.split("=")[1] as Theme | undefined;

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const newTheme =
      theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    document.cookie =
      `duitku-theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border px-4 py-2"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}