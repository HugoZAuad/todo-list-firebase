import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { TaskList } from '../../components/taskList';
import { Task } from '../../types/tasks';
import '@testing-library/jest-dom';

type DragEndEvent = {
  active: { id: string };
  over: { id: string } | null;
};

declare global {
  interface Window {
    __onDragEnd?: (event: DragEndEvent) => void;
  }
}

jest.mock('../../services/taskService', () => ({
  updateTask: jest.fn(),
}));

jest.mock('../../components/taskitem', () => ({
  TaskItem: ({ task }: { task: Task }) => (
    <div data-testid={`task-item-${task.id}`}>{task.title}</div>
  ),
}));

jest.mock('../../components/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));

jest.mock('@dnd-kit/core', () => ({
  DndContext: ({
    children,
    onDragEnd,
  }: {
    children: React.ReactNode;
    onDragEnd?: (event: DragEndEvent) => void;
  }) => {
    window.__onDragEnd = onDragEnd;
    return <div data-testid="dnd-context">{children}</div>;
  },
  closestCenter: jest.fn(),
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  useSensor: jest.fn(),
  useSensors: jest.fn(),
}));

jest.mock('@dnd-kit/sortable', () => ({
  arrayMove: jest.fn((arr: unknown[], from: number, to: number) => {
    const copy = [...arr];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  }),
  SortableContext: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sortable-context">{children}</div>
  ),
  sortableKeyboardCoordinates: jest.fn(),
  rectSortingStrategy: jest.fn(),
  useSortable: jest.fn(() => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  })),
}));

jest.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: jest.fn(() => ''),
    },
  },
}));

describe('Componente TaskList', () => {
  const mockSetTasks = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleStatus = jest.fn();
  const mockUpdateTask = jest.requireMock('../../services/taskService').updateTask;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'Pendente', order: 0 },
    { id: '2', title: 'Task 2', status: 'Concluido', order: 1 },
    { id: '3', title: 'Task 3', status: 'Pendente', order: 2 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.requireMock('@dnd-kit/core').useSensor.mockReturnValue(jest.fn());
    jest.requireMock('@dnd-kit/core').useSensors.mockReturnValue([]);
  });

  test('renderiza lista de tasks', () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  test('renderiza grid com classes CSS corretas', () => {
    const { container } = render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('md:grid-cols-3');
    expect(grid).toHaveClass('lg:grid-cols-4');
    expect(grid).toHaveClass('xl:grid-cols-5');
    expect(grid).toHaveClass('gap-4');
  });

  test('não quebra quando tasks está vazio', () => {
    render(
      <TaskList
        tasks={[]}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });

  test('não atualiza ordem quando uid é null', async () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid={null}
      />
    );

    await act(async () => {
      window.__onDragEnd?.({
        active: { id: '1' },
        over: { id: '2' },
      });
    });

    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  test('não atualiza ordem quando over é null no dragEnd', async () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    await act(async () => {
      window.__onDragEnd?.({
        active: { id: '1' },
        over: null,
      });
    });

    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  test('não atualiza ordem quando active.id === over.id', async () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    await act(async () => {
      window.__onDragEnd?.({
        active: { id: '1' },
        over: { id: '1' },
      });
    });

    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  test('atualiza ordem corretamente quando dragEnd ocorre com uid válido', async () => {
    const setTasksWithUpdate: React.Dispatch<React.SetStateAction<Task[]>> = (value) => {
      if (typeof value === 'function') {
        const newTasks = (value as (prevTasks: Task[]) => Task[])(mockTasks);
        newTasks.forEach((task, index) => {
          if (task.order !== index) {
            mockUpdateTask('test-uid', task.id, { order: index });
          }
        });
      }
    };

    render(
      <TaskList
        tasks={mockTasks}
        setTasks={setTasksWithUpdate}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    await act(async () => {
      window.__onDragEnd?.({
        active: { id: '1' },
        over: { id: '2' },
      });
    });

    expect(mockUpdateTask).toHaveBeenCalledWith('test-uid', '1', { order: 1 });
  });

  test('renderiza componentes DnD', () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    expect(screen.getByTestId('dnd-context')).toBeInTheDocument();
    expect(screen.getByTestId('sortable-context')).toBeInTheDocument();
  });

  test('cada task está dentro de um card', () => {
    render(
      <TaskList
        tasks={mockTasks}
        setTasks={mockSetTasks}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleStatus={mockOnToggleStatus}
        uid="test-uid"
      />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockTasks.length);
  });
});
