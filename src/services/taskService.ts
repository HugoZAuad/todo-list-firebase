import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "../../firebase/config"

export type TaskStatus = "pendente" | "concluido"

export type Task = {
  id?: string
  title: string
  status: TaskStatus
  uid: string
}

export const createTask = async (
  uid: string,
  task: { title: string; status: TaskStatus }
) => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const docRef = await addDoc(userTasksRef, {
    ...task,
    uid,
  })
  return docRef.id
}

export const getTasks = async (uid: string): Promise<Task[]> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const snapshot = await getDocs(userTasksRef)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }))
}

export const updateTask = async (
  uid: string,
  taskId: string,
  updatedTask: Partial<Omit<Task, "id" | "uid">>
) => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await updateDoc(taskRef, updatedTask)
}

export const deleteTask = async (uid: string, taskId: string) => {
  const taskRef = doc(db, "users", uid, "tasks", taskId)
  await deleteDoc(taskRef)
}
