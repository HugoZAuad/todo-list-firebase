import { useEffect, useState, useCallback } from "react"
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "../../firebase/config"

interface Task {
  id: string
  title: string
  status: "pendente" | "concluída"
  editMode?: boolean
}

export default function Tasks({ uid }: { uid: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const showAlert = (msg: string, type: "success" | "error") => {
    alert(`${type === "success" ? "✅" : "❌"} ${msg}`)
  }

  // 🔄 Carregar tarefas
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const userTasksRef = collection(db, "users", uid, "tasks")
      const snapshot = await getDocs(userTasksRef)
      const loadedTasks: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }))
      setTasks(loadedTasks)
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
      showAlert("Erro ao carregar tarefas", "error")
    } finally {
      setLoading(false)
    }
  }, [uid])

  // ➕ Criar tarefa
  const createTask = async () => {
    try {
      const userTasksRef = collection(db, "users", uid, "tasks")
      const docRef = await addDoc(userTasksRef, {
        title: "",
        status: "pendente",
      })
      const snapshot = await getDoc(docRef)
      const data = snapshot.data()

      if (!data) throw new Error("Erro ao obter dados da nova tarefa")

      const newTask: Task = {
        id: docRef.id,
        title: data.title,
        status: data.status,
        editMode: true,
      }

      setTasks((prev) => [...prev, newTask])
      showAlert("Tarefa criada com sucesso!", "success")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error)
      showAlert("Erro ao criar tarefa", "error")
    }
  }

  // ✏️ Atualizar tarefa
  const updateTask = async (task: Task) => {
    try {
      const taskRef = doc(db, "users", uid, "tasks", task.id)
      await updateDoc(taskRef, {
        title: task.title,
        status: task.status,
      })
      showAlert("Tarefa atualizada!", "success")
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
      showAlert("Erro ao atualizar tarefa", "error")
    }
  }

  // 🗑️ Excluir tarefa
  const deleteTask = async (id: string) => {
    try {
      const taskRef = doc(db, "users", uid, "tasks", id)
      await deleteDoc(taskRef)
      setTasks((prev) => prev.filter((task) => task.id !== id))
      showAlert("Tarefa excluída!", "success")
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error)
      showAlert("Erro ao excluir tarefa", "error")
    }
  }

  useEffect(() => {
    if (uid) fetchTasks()
  }, [uid, fetchTasks])

  if (loading) return <p>Carregando tarefas...</p>

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <button onClick={createTask}>➕ Nova Tarefa</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.editMode ? (
              <>
                <input
                  value={task.title}
                  onChange={(e) =>
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id ? { ...t, title: e.target.value } : t
                      )
                    )
                  }
                />
                <select
                  value={task.status}
                  onChange={(e) =>
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id
                          ? {
                              ...t,
                              status: e.target.value as Task["status"],
                            }
                          : t
                      )
                    )
                  }
                >
                  <option value="pendente">Pendente</option>
                  <option value="concluída">Concluída</option>
                </select>
                <button
                  onClick={() => {
                    updateTask(task)
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id ? { ...t, editMode: false } : t
                      )
                    )
                  }}
                >
                  💾 Salvar
                </button>
              </>
            ) : (
              <>
                <strong>{task.title}</strong> — {task.status}
                <button
                  onClick={() =>
                    setTasks((prev) =>
                      prev.map((t) =>
                        t.id === task.id ? { ...t, editMode: true } : t
                      )
                    )
                  }
                >
                  ✏️ Editar
                </button>
                <button onClick={() => deleteTask(task.id)}>🗑️ Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
