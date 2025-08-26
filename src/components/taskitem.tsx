import React from "react"
import { Task } from "../services/taskService"
import "../styles/taskitem.css"

type Props = {
  task: Task
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
  isDragging?: boolean
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

export const TaskItem: React.FC<Props> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
  isDragging,
  dragHandleProps,
}) => {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-300 ${
        task.status === "Concluido" ? "concluido" : ""
      } ${isDragging ? "dragging" : ""}`}
    >
      <div 
        {...dragHandleProps}
        style={{ cursor: 'grab' }}
        className="text-gray-400 hover:text-white select-none" 
        title="Arraste"
      >
        ☰
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <span
          className={`px-2 py-1 text-xs rounded w-fit transition-all duration-300 ${
            task.status === "Concluido"
              ? "bg-green-600 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {task.status}
        </span>

        <input
          type="text"
          value={task.title}
          onChange={(e) => onEdit(task.id, e.target.value)}
          className={`w-full px-2 py-1 rounded bg-zinc-300 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            task.status === "Concluido" ? "concluido" : ""
          }`}
        />

        <div className="flex justify-between items-center">
          <button
            onClick={() => onToggleStatus(task.id)}
            className="px-2 py-1 rounded text-sm bg-green-600 hover:bg-green-700 text-white"
          >
            Concluir
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
