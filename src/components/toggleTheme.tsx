import { useEffect, useState } from "react"

export function ToggleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = savedTheme || "light"
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)

    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md border transition-colors duration-300
        ${theme === "light" ? "bg-white text-black hover:bg-zinc-100" : "bg-zinc-800 text-white hover:bg-zinc-700"}
      `}
    >
      {theme === "light" ? "Modo Escuro" : "Modo Claro"}
    </button>
  )
}
