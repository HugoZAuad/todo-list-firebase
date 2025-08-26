import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white dark:bg-zinc-700 ${className}`}>
      {children}
    </div>
  )
}
