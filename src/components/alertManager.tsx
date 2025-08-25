import { useEffect, useState } from "react"

interface Alert {
  id: string
  message: string
  type: "primary" | "success" | "danger" | "warning" | "info"
}

export function AlertManager() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const handler = (e: CustomEvent<Alert>) => {
      const newAlert = { ...e.detail, id: crypto.randomUUID() }
      setAlerts((prev) => [...prev, newAlert])
    }

    window.addEventListener("alert", handler as EventListener)

    return () => window.removeEventListener("alert", handler as EventListener)
  }, [])

  useEffect(() => {
    const timers = alerts.map((alert) =>
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
      }, 3000)
    )

    return () => timers.forEach(clearTimeout)
  }, [alerts])

  const colorMap: Record<Alert["type"], string> = {
    primary: "bg-blue-600 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-cyan-500 text-white",
  }

  return (
    <div className="fixed bottom-10 left-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 items-start sm:items-end">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out animate-fade-in ${colorMap[alert.type]} bg-opacity-95`}
        >
          {alert.message}
        </div>
      ))}
    </div>
  )
}
