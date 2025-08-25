import React, { useEffect, useState } from "react"
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  Task,
} from "../services/taskService"

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

  // 🔹 Cria nova tarefa
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

  // 🔹 Edita tarefa existente
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

  // 🔹 Remove tarefa
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(uid, id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error)
    }
  }

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={handleCreate}>Criar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleEdit(task.id, e.target.value)}
            />
            <button onClick={() => handleDelete(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
