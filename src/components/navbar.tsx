import { useState } from "react"
import { useSession } from "../hooks/useSessions"
import Button from "./button"

interface Tab {
  label: string
  value: string
}

const tabs: Tab[] = [
  { label: "Todos", value: "todos" },
  { label: "Pendentes", value: "pendente" },
  { label: "Concluídos", value: "concluido" },
]

interface NavbarProps {
  onChange?: (value: string) => void
}

export default function Navbar({ onChange }: NavbarProps) {
  const { user, logout, loading } = useSession()
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

      <Button className="bg-red-600 hover:bg-red-700" onClick={logout}>
        Logout
      </Button>
    </nav>
  )
}
