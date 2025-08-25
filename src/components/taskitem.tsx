import { useState } from "react"
import { showAlert } from "../utils/alert"

interface TaskItemProps {
  task: {
    id: string
    title: string
    status: "pendente" | "concluido" | "excluido"
    editMode?: boolean
  }
  onEdit: (id: string, newTitle: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function TaskItem({ task, onEdit, onDelete, onToggleStatus }: TaskItemProps) {
  const [title, setTitle] = useState(task.title)

  const statusColor =
    task.status === "concluido" ? "bg-green-500" : "bg-yellow-500"

  const titleStyle =
    task.status === "concluido"
      ? "line-through text-zinc-400"
      : "text-zinc-100"

  const handleSave = () => {
    if (title.trim()) {
      onEdit(task.id, title.trim())
    }
  }

  const handleToggle = () => {
    onToggleStatus(task.id)
    const mensagem =
      task.status === "pendente"
        ? `Tarefa "${task.title}" concluída com sucesso!`
        : `Tarefa "${task.title}" marcada como pendente.`
    showAlert(mensagem, "success")
  }

  return (
    <div className="p-4 rounded bg-zinc-700 shadow-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColor}`}>
          {task.status === "concluido" ? "Concluído" : "Pendente"}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          Excluir
        </button>
      </div>

      {task.editMode ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="px-2 py-1 rounded bg-zinc-800 text-white focus:outline-none"
          autoFocus
        />
      ) : (
        <span className={`text-sm font-medium ${titleStyle}`}>
          {task.title}
        </span>
      )}

      {!task.editMode && (
        <button
          onClick={handleToggle}
          className={`mt-2 text-xs px-3 py-1 rounded text-white ${
            task.status === "concluido"
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {task.status === "concluido" ? "Desfazer Conclusão" : "Concluir"}
        </button>
      )}
    </div>
  )
}
