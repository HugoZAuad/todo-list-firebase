export type TaskStatus = "pendente" | "concluido" | "excluido"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  editMode?: boolean
}
