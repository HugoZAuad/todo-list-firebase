interface EmptyStateProps {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center text-zinc-500 py-10">
      <p>{message}</p>
    </div>
  )
}
