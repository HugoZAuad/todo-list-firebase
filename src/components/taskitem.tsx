import { useState } from "react"
import Button from "./button"

interface Task {
  id: string
  title: string
  status: "pendente" | "concluido" | "excluido"
}

interface Props {
  task: Task
  onEdit: (id: string, newTitle: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onEdit, onDelete }: Props) {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)

  const handleSave = () => {
    onEdit(task.id, newTitle)
    setEditMode(false)
  }

  const statusColor =
    task.status === "concluido" ? "bg-green-500" : "bg-yellow-500"

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2 py-1 rounded-full text-white ${statusColor}`}
        >
          {task.status === "concluido" ? "Concluído" : "Pendente"}
        </span>

        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-2 py-1 border rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
          />
        ) : (
          <span className="text-sm text-zinc-800 dark:text-white">
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editMode ? (
          <>
            <Button onClick={handleSave}>Salvar</Button>
            <Button onClick={() => setEditMode(false)} className="bg-gray-500 hover:bg-gray-600">
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)}>Editar</Button>
            <Button onClick={() => onDelete(task.id)} className="bg-red-600 hover:bg-red-700">
              Excluir
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
