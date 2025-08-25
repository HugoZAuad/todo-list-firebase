
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "../../firebase/config"

export interface Task {
  id: string
  title: string
  status: "pendente" | "concluída"
}

export const getTasks = async (uid: string): Promise<Task[]> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const snapshot = await getDocs(userTasksRef)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }))
}

export const createTask = async (
  uid: string,
  task: Omit<Task, "id">
): Promise<{ id: string }> => {
  const userTasksRef = collection(db, "users", uid, "tasks")
  const docRef = await addDoc(userTasksRef, task)
  return { id: docRef.id }
}

export const updateTask = async (
  uid: string,
  id: string,
  updates: Partial<Omit<Task, "id">>
): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", id)
  await updateDoc(taskRef, updates)
}

export const deleteTask = async (uid: string, id: string): Promise<void> => {
  const taskRef = doc(db, "users", uid, "tasks", id)
  await deleteDoc(taskRef)
}
