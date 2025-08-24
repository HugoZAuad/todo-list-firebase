import { useEffect, useState } from "react"

interface Alert {
  id: number
  message: string
  type: "primary" | "success" | "danger"
}

export function AlertManager() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const handler = (e: CustomEvent<Alert>) => {
      setAlerts((prev) => [...prev, { ...e.detail, id: Date.now() }])
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

  // Usando classes padrão do Tailwind
  const colorMap = {
    primary: "bg-blue-600 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out animate-fade-in ${colorMap[alert.type]} bg-opacity-100`}
        >
          {alert.message}
        </div>
      ))}
    </div>
  )
}
