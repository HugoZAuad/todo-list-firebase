import { useState } from "react"
import { Task } from "../types/tasks"
import { showAlert } from "../utils/alert"

interface Props {
  task: Task
  onDelete: (id: string) => void
  onEdit: (id: string, newTitle: string) => void
  onToggleStatus: (id: string) => void
}

export function TaskItem({ task, onDelete, onEdit, onToggleStatus }: Props) {
  const [editMode, setEditMode] = useState(task.editMode || false)
  const [newTitle, setNewTitle] = useState(task.title)

  const handleSave = () => {
    if (newTitle.trim() === "") {
      showAlert("Não é possível salvar uma tarefa vazia.", "danger")
      return
    }
    onEdit(task.id, newTitle)
    setEditMode(false)
  }

  return (
    <li className={`task ${task.status}`}>
      {editMode ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setEditMode(true)}>Editar</button>
          <button onClick={() => onToggleStatus(task.id)}>
            {task.status === "concluido" ? "Desfazer" : "Concluir"}
          </button>
          <button onClick={() => onDelete(task.id)}>Excluir</button>
        </>
      )}
    </li>
  )
}
