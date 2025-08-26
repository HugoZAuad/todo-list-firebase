import { useState } from "react"
import { useSession } from "../hooks/useSessions"
import { useTheme } from "../hooks/useTheme"
import Button from "./button"
import { FiSun, FiMoon } from "react-icons/fi"

interface Tab {
  label: string
  value: string
}

const tabs: Tab[] = [
  { label: "Todos", value: "todos" },
  { label: "Pendentes", value: "Pendente" },
  { label: "Concluídos", value: "Concluido" },
]

interface NavbarProps {
  onChange?: (value: string) => void
}

export default function Navbar({ onChange }: NavbarProps) {
  const { user, logout, loading } = useSession()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("todos")

  const handleClick = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  if (loading || !user) return null

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-zinc-800">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`text-sm font-medium px-4 py-2 rounded transition-colors ${
              activeTab === tab.value
                ? "bg-zinc-600 text-white"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="bg-zinc-600 hover:bg-zinc-700 flex items-center gap-2"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </Button>
        <Button className="bg-red-600 hover:bg-red-700" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
