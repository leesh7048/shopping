import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saveDarkMode = localStorage.getItem("theme");
    if (saveDarkMode === null) return "정해지지 않음";
    return saveDarkMode;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}
