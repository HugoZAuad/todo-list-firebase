import { useState } from "react"
import Navbar from "../components/navbar"
import { Card } from "../components/card"
import Button from "../components/button"
import TaskItem from "../components/taskitem"

interface Task {
  id: string
  title: string
  status: "pendente" | "concluido" | "excluido"
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
      title: "Nova tarefa",
      status: "pendente",
    }
    setTasks((prev) => [...prev, newTask])
  }

  const handleEdit = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: "excluido" } : task))
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar onChange={(filtro) => setFilter(filtro)} />

      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-400">Minhas Tarefas</h2>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
            Nova Tarefa
          </Button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
