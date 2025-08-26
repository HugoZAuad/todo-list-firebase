import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { TaskItem } from "../../components/taskitem"
import "@testing-library/jest-dom"

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()
const mockOnToggleStatus = jest.fn()

const mockTask = {
  id: "1",
  title: "Tarefa de teste",
  status: "Pendente" as const,
  order: 0,
  editMode: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe("TaskItem", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renderiza título e status corretamente", () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    expect(screen.getByText("Tarefa de teste")).toBeInTheDocument()
    expect(screen.getByText("Pendente")).toBeInTheDocument()
  })

  it("chama onEdit ao clicar no botão de edição (linha 37)", () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Pendente" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.click(screen.getByTitle("Editar tarefa"))
    expect(mockOnEdit).toHaveBeenCalledWith("1", "Tarefa de teste", false)
  })

  it('chama onToggleStatus ao clicar em "Concluir" (linha 76)', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Pendente" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.click(screen.getByText("Concluir"))
    expect(mockOnToggleStatus).toHaveBeenCalledWith("1")
  })

  it('chama onDelete ao clicar em "Excluir" (linha 103)', () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.click(screen.getByText("Excluir"))
    expect(mockOnDelete).toHaveBeenCalledWith("1")
  })

  it('renderiza botão "Desfazer" quando status é "Concluido"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Concluido" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    expect(screen.getByText("Desfazer")).toBeInTheDocument()
  })

  it('desabilita botão de edição quando status é "Concluido"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Concluido" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    const editButton = screen.getByTitle("Desfaça a conclusão para editar")
    expect(editButton).toBeDisabled()
  })

  it("entra em modo de edição quando editMode é true", () => {
    render(
      <TaskItem
        task={{ ...mockTask, editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it('salva edição ao clicar em "Salvar"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Nova tarefa" },
    })
    fireEvent.click(screen.getByText("Salvar"))
    expect(mockOnEdit).toHaveBeenCalledWith("1", "Nova tarefa", true)
  })

  it('cancela edição ao clicar em "Cancelar"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Nova tarefa" },
    })
    fireEvent.click(screen.getByText("Cancelar"))
    expect(screen.getByText("Tarefa de teste")).toBeInTheDocument()
  })

  it('desabilita botão "Salvar" quando título está vazio', () => {
    render(
      <TaskItem
        task={{ ...mockTask, editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "   " },
    })
    expect(screen.getByText("Salvar")).toBeDisabled()
  })

  it('não salva edição quando título está vazio', () => {
    render(
      <TaskItem
        task={{ ...mockTask, editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    
    jest.clearAllMocks()
    
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "   " },
    })
    fireEvent.click(screen.getByText("Salvar"))
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('habilita botão de edição quando status é "Pendente"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Pendente" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    const editButton = screen.getByTitle("Editar tarefa")
    expect(editButton).not.toBeDisabled()
  })

  it('não chama onEdit ao clicar no botão de edição quando status é "Concluido"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Concluido" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    const editButton = screen.getByTitle("Desfaça a conclusão para editar")
    
    fireEvent.click(editButton)
    
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('não chama onToggleStatus quando status é "Concluido"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Concluido" }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    
    fireEvent.click(screen.getByText("Desfazer"))
    
    expect(mockOnToggleStatus).toHaveBeenCalledWith("1")
  })

  it('aplica classe "concluido" ao textarea quando status é "Concluido"', () => {
    render(
      <TaskItem
        task={{ ...mockTask, status: "Concluido", editMode: true }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
      />
    )
    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("concluido")
  })

  it('aplica classe "dragging" quando isDragging é true', () => {
    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        isDragging
      />
    )
    const container = screen.getByTestId("task-item")
    expect(container).toHaveClass("dragging")
  })

  it("aplica dragHandleProps corretamente com data-testid", () => {
    const dragProps: React.HTMLAttributes<HTMLDivElement> = {}
    dragProps["data-testid"] = "drag-handle"

    render(
      <TaskItem
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        dragHandleProps={dragProps}
      />
    )

    expect(screen.getByTestId("drag-handle")).toBeInTheDocument()
  })
})
