import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GoogleLoginButton from '../../components/googleLoginButton';
import '@testing-library/jest-dom';

jest.mock('firebase/auth', () => {
  const mockProvider = {
    setCustomParameters: jest.fn(),
  };
  return {
    GoogleAuthProvider: jest.fn(() => mockProvider),
    signInWithPopup: jest.fn(),
  };
});

jest.mock('../../../firebase/config', () => ({
  auth: {},
}));

jest.mock('../../utils/alert', () => ({
  showAlert: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Componente GoogleLoginButton', () => {
  const mockSignInWithPopup = jest.requireMock('firebase/auth').signInWithPopup;
  const mockShowAlert = jest.requireMock('../../utils/alert').showAlert;
  const mockUseNavigate = jest.requireMock('react-router-dom').useNavigate;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  test('renderiza botão com texto padrão', () => {
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Entrar com Google')).toBeInTheDocument();
  });

  test('renderiza texto de carregamento quando loading é true', () => {
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    fireEvent.click(button);
    
    expect(screen.getByText('Conectando...')).toBeInTheDocument();
  });

  test('chama signInWithPopup quando clicado', async () => {
    mockSignInWithPopup.mockResolvedValueOnce({});
    
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockSignInWithPopup).toHaveBeenCalled();
    });
  });

  test('mostra alerta de sucesso após login bem-sucedido', async () => {
    mockSignInWithPopup.mockResolvedValueOnce({});
    
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Login com Google realizado com sucesso!', 'success');
    });
  });

  test('navega para /tarefas após login bem-sucedido', async () => {
    mockSignInWithPopup.mockResolvedValueOnce({});
    
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tarefas');
    });
  });

  test('mostra alerta de erro quando login falha', async () => {
    const error = new Error('Erro de autenticação');
    mockSignInWithPopup.mockRejectedValueOnce(error);
    
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Erro ao logar com Google.', 'danger');
    });
  });

  test('está desabilitado quando prop disabled é true', () => {
    render(
      <BrowserRouter>
        <GoogleLoginButton disabled={true} />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    expect(button).toBeDisabled();
  });

  test('aplica classes CSS corretas', () => {
    render(
      <BrowserRouter>
        <GoogleLoginButton />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Entrar com Google');
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('hover:bg-red-700');
    expect(button).toHaveClass('w-3/6');
  });
});
