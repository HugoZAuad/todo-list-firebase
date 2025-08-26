export type TaskStatus = "Pendente" | "Concluido" | "Excluido"

export interface Task {
  id: string
  title: string
  status: TaskStatus
  editMode?: boolean
  order?: number;
}
