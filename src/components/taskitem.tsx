import React, { useState, useEffect } from "react"
import { Task } from "../services/taskService"
import "../styles/taskitem.css"
import { FaPenAlt } from "react-icons/fa"

type Props = {
  task: Task
  onEdit: (id: string, title: string, save?: boolean) => void
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
  const [localTitle, setLocalTitle] = useState(task.title)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (task.editMode) {
      setIsEditing(true)
      onEdit(task.id, task.title, false) 
    } else {
      setIsEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.editMode])

  const handleSave = () => {
    if (localTitle.trim() === "") return
    onEdit(task.id, localTitle, true)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setLocalTitle(task.title)
    setIsEditing(false)
  }

  return (
    <div data-testid="task-item"
      className={`relative flex flex-col gap-4 transition-all duration-300 task-item p-4 rounded bg-zinc-800 ${
        task.status === "Concluido" ? "concluido" : ""
      } ${isDragging ? "dragging" : ""}`}
    >
      <div
        {...dragHandleProps}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white select-none"
        style={{ cursor: "grab" }}
        title="Arraste"
      >
        ☰
      </div>

      <div className="flex flex-col flex-1 gap-2 pl-6">
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 text-xs rounded transition-all duration-300 ${
              task.status === "Concluido"
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
          >
            {task.status}
          </span>

          <button
            onClick={() => {
              if (task.status !== "Concluido") {
                setIsEditing(true)
                onEdit(task.id, task.title, false)
              }
            }}
            className={`px-2 py-1 rounded text-sm ${
              task.status === "Concluido"
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:text-slate-400"
            }`}
            disabled={task.status === "Concluido"}
            title={
              task.status === "Concluido"
                ? "Desfaça a conclusão para editar"
                : "Editar tarefa"
            }
          >
            <FaPenAlt />
          </button>
        </div>

        {isEditing ? (
          <>
            <textarea
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className={`w-full px-2 py-2 rounded bg-zinc-300 text-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                task.status === "Concluido" ? "concluido" : ""
              }`}
              rows={Math.max(2, localTitle.split("\n").length)}
            />
            <div className="flex justify-between items-center">
              <button
                onClick={handleSave}
                disabled={localTitle.trim() === ""}
                className={`px-2 py-1 rounded text-sm ${
                  localTitle.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="px-2 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <span className="text-zinc-300 whitespace-pre-wrap break-words w-full">
            {task.title}
          </span>
        )}

        {!isEditing && (
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => onToggleStatus(task.id)}
              className="px-2 py-1 rounded text-sm bg-green-600 hover:bg-green-700 text-white"
            >
              {task.status === "Concluido" ? "Desfazer" : "Concluir"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-2 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
