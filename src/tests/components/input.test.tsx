import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/input';
import '@testing-library/jest-dom';

describe('Componente Input', () => {
  test('renderiza input com placeholder', () => {
    render(<Input placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText(/digite algo/i)).toBeInTheDocument();
  });

  test('renderiza input do tipo texto', () => {
    render(<Input type="text" placeholder="Texto" />);
    expect(screen.getByPlaceholderText('Texto')).toHaveAttribute('type', 'text');
  });

  test('renderiza input do tipo password', () => {
    render(<Input type="password" placeholder="Senha" />);
    expect(screen.getByPlaceholderText('Senha')).toHaveAttribute('type', 'password');
  });

  test('alterna visibilidade da senha', () => {
    render(<Input type="password" showToggle placeholder="Senha" />);
    const toggleButton = screen.getByLabelText(/alternar visibilidade da senha/i);
    const inputElement = screen.getByPlaceholderText('Senha');

    expect(inputElement).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  test('não mostra botão de toggle quando showToggle é false', () => {
    render(<Input type="password" showToggle={false} placeholder="Senha" />);
    expect(screen.queryByLabelText(/alternar visibilidade da senha/i)).not.toBeInTheDocument();
  });

  test('aplica secureInput corretamente (estilo)', () => {
    render(<Input secureInput placeholder="Segura" />);
    expect(screen.getByPlaceholderText('Segura')).toHaveStyle({ userSelect: 'none' });
  });

  test('bloqueia evento de colar quando secureInput está ativo', () => {
    render(<Input secureInput placeholder="Segura" />);
    const inputElement = screen.getByPlaceholderText('Segura');

    fireEvent.paste(inputElement, {
      clipboardData: { getData: () => 'texto secreto' },
    });

    expect(inputElement).toHaveValue('');
  });

  test('bloqueia evento de copiar quando secureInput está ativo', () => {
    render(<Input secureInput placeholder="Segura" />);
    const inputElement = screen.getByPlaceholderText('Segura');

    fireEvent.copy(inputElement);
    expect(inputElement).toHaveValue('');
  });

  test('bloqueia evento de cortar quando secureInput está ativo', () => {
    render(<Input secureInput placeholder="Segura" />);
    const inputElement = screen.getByPlaceholderText('Segura');

    fireEvent.cut(inputElement);
    expect(inputElement).toHaveValue('');
  });

  test('bloqueia evento de arrastar quando secureInput está ativo', () => {
    render(<Input secureInput placeholder="Segura" />);
    const inputElement = screen.getByPlaceholderText('Segura');

    fireEvent.dragStart(inputElement);
    expect(inputElement).toHaveValue('');
  });

  test('bloqueia evento de selecionar quando secureInput está ativo', () => {
    const preventDefault = jest.fn();

    render(<Input secureInput placeholder="Segura" />);
    const inputElement = screen.getByPlaceholderText('Segura');

    inputElement.addEventListener('select', (e) => {
      e.preventDefault = preventDefault;
      e.preventDefault();
    });

    fireEvent.select(inputElement);

    expect(preventDefault).toHaveBeenCalled();
  });

  test('chama onChange handler quando o valor muda', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Texto" />);
    fireEvent.change(screen.getByPlaceholderText('Texto'), {
      target: { value: 'novo valor' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('aplica className customizada corretamente', () => {
    render(<Input className="classe-customizada" placeholder="Estilizado" />);
    expect(screen.getByPlaceholderText('Estilizado')).toHaveClass('classe-customizada');
  });
});
