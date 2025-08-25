// src/components/TaskItem.tsx
import React from "react"
import { Task } from "../services/taskService"

type Props = {
  task: Task
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export const TaskItem: React.FC<Props> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={task.title}
        onChange={(e) => onEdit(task.id, e.target.value)}
        className="w-full px-2 py-1 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`px-2 py-1 rounded text-sm ${
            task.status === "concluido"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-yellow-600 hover:bg-yellow-700"
          }`}
        >
          {task.status === "concluido" ? "Concluída" : "Pendente"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-600"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
