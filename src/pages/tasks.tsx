import { useState } from "react"
import Navbar from "../components/navbar"
import { Card } from "../components/card"
import Button from "../components/button"
import {TaskItem} from "../components/taskitem"
import { showAlert } from "../utils/alert"

interface Task {
  id: string
  title: string
  status: "pendente" | "concluido" | "excluido"
  editMode?: boolean 
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState("todos")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "todos") return task.status !== "excluido"
    return task.status === filter
  })

  const handleCreate = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: "",
      status: "pendente",
      editMode: true, 
    }
    setTasks((prev) => [...prev, newTask])
    showAlert("Tarefa criada com sucesso!", "success")
  }

  const handleEdit = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, editMode: false } 
          : task
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "excluido" } : task
      )
    )
    showAlert("Tarefa excluída com sucesso!", "danger")
  }

  const handleToggleStatus = (id: string) => {
    setTasks((prev: Task[]) =>
      prev.map((task: Task) => {
        if (task.id === id) {
          const novoStatus = task.status === "concluido" ? "pendente" : "concluido"
          if (novoStatus === "concluido") {
            showAlert(`Tarefa "${task.title}" concluída com sucesso!`, "success")
          }
          return { ...task, status: novoStatus }
        }
        return task
      })
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar onChange={(filtro) => setFilter(filtro)} />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-100 dark:text-white">Minhas Tarefas</h2>
          <Button
            onClick={handleCreate}
            className="bg-zinc-600 hover:bg-zinc-700"
          >
            Adicionar Tarefa
          </Button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
