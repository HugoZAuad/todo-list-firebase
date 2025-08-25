import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import { Card } from "../components/card"
import Button from "../components/button"
import { TaskItem } from "../components/taskitem"
import { showAlert } from "../utils/alert"
import { auth } from "../../firebase/config"
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  Task,
} from "../services/taskService"
import { onAuthStateChanged } from "firebase/auth"

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState("todos")
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        try {
          const data = await getTasks(user.uid)
          setTasks(data || [])
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error)
        }
      } else {
        setUid(null)
        setTasks([])
      }
    })
    return () => unsubscribe()
  }, [])

  const filteredTasks = tasks.filter((task) => {
    if (filter === "todos") return task.status !== "excluido"
    return task.status === filter
  })

  const handleCreate = async () => {
    if (!uid) return
    try {
      const doc = await createTask(uid, { title: "", status: "pendente" })
      const newTask: Task = {
        id: doc.id,
        title: "",
        status: "pendente",
        editMode: true,
      }
      setTasks((prev) => [...prev, newTask])
      showAlert("Tarefa criada com sucesso!", "success")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error)
    }
  }

  const handleEdit = async (id: string, newTitle: string) => {
    try {
      await updateTask(uid!, id, { title: newTitle })
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: newTitle, editMode: false } : task
        )
      )
    } catch (error) {
      console.error("Erro ao editar tarefa:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(uid!, id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
      showAlert("Tarefa excluída com sucesso!", "danger")
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error)
    }
  }

  const handleToggleStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task || !uid) return
    const novoStatus = task.status === "concluido" ? "pendente" : "concluido"
    try {
      await updateTask(uid, id, { status: novoStatus })
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
      )
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  if (!uid) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        <p>🔒 Faça login para acessar suas tarefas.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-zinc-300">
      <Navbar onChange={(filtro) => setFilter(filtro)} />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Minhas Tarefas</h2>
          <Button
            onClick={handleCreate}
            className="bg-zinc-600 hover:bg-zinc-700 text-white"
          >
            Adicionar Tarefa
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-zinc-400 mt-10">
            Nenhuma tarefa encontrada.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="transition-transform duration-300 animate-fade-in bg-zinc-800 text-white"
              >
                <TaskItem
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}