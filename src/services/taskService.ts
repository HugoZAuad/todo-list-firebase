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
  status: "Pendente" | "Concluido" | "Excluido"
  uid?: string
  editMode?: boolean
  order?: number
}

export const createTask = async (
  uid: string,
  task: { title: string; status: "Pendente" | "Concluido" }
): Promise<DocumentReference> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  
  const snapshot = await getDocs(userTasksRef)
  const order = snapshot.size
  
  const docRef = await addDoc(userTasksRef, {
    ...task,
    uid,
    order,
  })
  return docRef
}

export const getTasks = async (uid: string): Promise<Task[]> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const snapshot = await getDocs(userTasksRef)
  const tasks: Task[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }))
  
  return tasks.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export const updateTask = async (
  uid: string,
  taskId: string,
  updates: Partial<Omit<Task, "id">>
): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(taskRef, updates)
}

export const deleteTask = async (uid: string, taskId: string): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await deleteDoc(taskRef)
}