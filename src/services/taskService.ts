import { db } from "../../firebase/config"
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from "firebase/firestore"

export type Task = {
  id: string
  title: string
  status: "pendente" | "concluido"
  uid?: string
}

// 🔹 Cria uma nova tarefa
export const createTask = async (
  uid: string,
  task: { title: string; status: "pendente" | "concluido" }
): Promise<DocumentReference> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const docRef = await addDoc(userTasksRef, {
    ...task,
    uid,
  })
  return docRef
}

// 🔹 Lista todas as tarefas de um usuário
export const getTasks = async (uid: string): Promise<Task[]> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const snapshot = await getDocs(userTasksRef)
  const tasks: Task[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }))
  return tasks
}

// 🔹 Atualiza uma tarefa existente
export const updateTask = async (
  uid: string,
  taskId: string,
  updates: Partial<Omit<Task, "id">>
): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(taskRef, updates)
}

// 🔹 Remove uma tarefa
export const deleteTask = async (uid: string, taskId: string): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await deleteDoc(taskRef)
}
