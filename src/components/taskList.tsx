import React from "react"
import { Task, updateTask } from "../services/taskService"
import { TaskItem } from "./taskitem"
import { Card } from "./card"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  onEdit: (id: string, title: string, save?: boolean) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
  uid: string | null
}

function SortableTask({ task, onEdit, onDelete, onToggleStatus }: {
  task: Task
  onEdit: (id: string, title: string, save?: boolean) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card>
        <TaskItem
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          isDragging={isDragging}
          dragHandleProps={listeners}
        />
      </Card>
    </div>
  )
}

export const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  onEdit,
  onDelete,
  onToggleStatus,
  uid,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id || !uid) return

    setTasks((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      const reorderedTasks = arrayMove(items, oldIndex, newIndex)
      
      reorderedTasks.forEach(async (task, index) => {
        if (task.order !== index) {
          try {
            await updateTask(uid, task.id, { order: index })
          } catch (error) {
            console.error('Erro ao atualizar ordem da task:', error)
          }
        }
      })

      return reorderedTasks
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
