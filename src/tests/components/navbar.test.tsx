import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/navbar';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useSessions', () => ({
  useSession: jest.fn(),
}));

jest.mock('../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiSun: () => <div data-testid="fi-sun">FiSun</div>,
  FiMoon: () => <div data-testid="fi-moon">FiMoon</div>,
}));

jest.mock('react-icons/md', () => ({
  MdTour: () => <div data-testid="md-tour">MdTour</div>,
}));

jest.mock('../../components/Tour', () => ({
  __esModule: true,
  default: () => <div data-testid="tour-component">Tour</div>,
}));

jest.mock('../../components/button', () => ({
  __esModule: true,
  default: ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={className} data-testid="button">
      {children}
    </button>
  ),
}));

describe('Componente Navbar', () => {
  const mockUseSession = jest.requireMock('../../hooks/useSessions').useSession;
  const mockUseTheme = jest.requireMock('../../hooks/useTheme').useTheme;
  const mockLogout = jest.fn();
  const mockToggleTheme = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    mockUseSession.mockReturnValue({
      user: { email: 'test@example.com' },
      logout: mockLogout,
      loading: false,
    });

    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });
  });

  test('não renderiza quando loading é true', () => {
    mockUseSession.mockReturnValue({
      user: null,
      logout: mockLogout,
      loading: true,
    });

    const { container } = render(<Navbar />);
    expect(container.firstChild).toBeNull();
  });

  test('não renderiza quando user é null', () => {
    mockUseSession.mockReturnValue({
      user: null,
      logout: mockLogout,
      loading: false,
    });

    const { container } = render(<Navbar />);
    expect(container.firstChild).toBeNull();
  });

  test('renderiza tabs quando user está logado', () => {
    render(<Navbar onChange={mockOnChange} />);
    
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Pendentes')).toBeInTheDocument();
    expect(screen.getByText('Concluídos')).toBeInTheDocument();
  });

  test('chama onChange quando tab é clicada', () => {
    render(<Navbar onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByText('Pendentes'));
    expect(mockOnChange).toHaveBeenCalledWith('Pendente');
  });

  test('muda tab ativa quando clicada', () => {
    render(<Navbar />);
    
    const pendentesButton = screen.getByText('Pendentes');
    fireEvent.click(pendentesButton);
    
    expect(pendentesButton).toHaveClass('bg-zinc-600');
    expect(pendentesButton).toHaveClass('text-white');
  });

  test('chama toggleTheme quando botão de tema é clicado', () => {
    render(<Navbar />);
    
    const themeButton = screen.getByTestId('fi-sun').closest('button');
    fireEvent.click(themeButton!);
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('chama logout quando botão de logout é clicado', () => {
    render(<Navbar />);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
  });

  test('mostra ícone de sol quando tema é dark', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<Navbar />);
    
    expect(screen.getByTestId('fi-sun')).toBeInTheDocument();
  });

  test('mostra ícone de lua quando tema é light', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<Navbar />);
    
    expect(screen.getByTestId('fi-moon')).toBeInTheDocument();
  });

  test('aplica classes CSS corretas', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-zinc-800');
    expect(nav).toHaveClass('shadow-md');
    expect(nav).toHaveClass('px-6');
    expect(nav).toHaveClass('py-4');
  });
});
