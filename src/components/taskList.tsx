import React, { useEffect, useState } from "react"
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  Task,
} from "../services/taskService"
import { TaskItem } from "./taskitem"

type Props = {
  uid: string
}

const TaskList: React.FC<Props> = ({ uid }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(uid)
        setTasks(data || [])
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error)
      }
    }
    fetchTasks()
  }, [uid])

  const handleCreate = async () => {
    if (!newTitle.trim()) return
    try {
      const docRef = await createTask(uid, {
        title: newTitle,
        status: "pendente",
      })
      const newTask: Task = {
        id: docRef.id,
        title: newTitle,
        status: "pendente",
      }
      setTasks((prev) => [...prev, newTask])
      setNewTitle("")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error)
    }
  }

  const handleEdit = async (id: string, title: string) => {
    try {
      await updateTask(uid, id, { title })
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, title } : task))
      )
    } catch (error) {
      console.error("Erro ao editar tarefa:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(uid, id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Minhas Tarefas</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Criar
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={() => {}}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList