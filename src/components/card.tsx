interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  )
}
