import { useState } from "react"

interface Tab {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  onChange?: (value: string) => void
  initialValue?: string
}

export function Tabs({ tabs, onChange, initialValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialValue || tabs[0].value)

  const handleClick = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  return (
    <div className="flex gap-2 border-b dark:border-zinc-700">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleClick(tab.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200
            ${
              activeTab === tab.value
                ? "border-b-2 border-primary text-primary"
                : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-500"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
