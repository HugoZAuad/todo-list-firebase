interface TaskItemProps {
  title: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
}

export function TaskItem({ title, completed, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-white dark:bg-zinc-800">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="accent-blue-500"
        />
        <span className={completed ? "line-through text-zinc-400" : ""}>{title}</span>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        🗑️
      </button>
    </div>
  )
}
