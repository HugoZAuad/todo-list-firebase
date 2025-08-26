import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/button';
import '@testing-library/jest-dom';

describe('Componente Button', () => {
  test('renderiza botão com texto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  test('executa onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique aqui</Button>);
    
    fireEvent.click(screen.getByText('Clique aqui'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('não executa onClick quando desabilitado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Clique aqui</Button>);
    
    fireEvent.click(screen.getByText('Clique aqui'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('aplica classes CSS de desabilitado quando disabled é true', () => {
    render(<Button disabled>Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).toHaveClass('bg-gray-400');
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).not.toHaveClass('bg-blue-600');
    expect(button).not.toHaveClass('hover:bg-blue-700');
  });

  test('aplica classes CSS padrão quando não está desabilitado', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('hover:bg-blue-700');
    expect(button).not.toHaveClass('bg-gray-400');
    expect(button).not.toHaveClass('cursor-not-allowed');
  });

  test('aplica className customizada', () => {
    render(<Button className="minha-classe">Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).toHaveClass('minha-classe');
  });

  test('tem type button por padrão', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('aplica type submit quando especificado', () => {
    render(<Button type="submit">Enviar</Button>);
    
    const button = screen.getByText('Enviar');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('está desabilitado quando disabled é true', () => {
    render(<Button disabled>Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).toBeDisabled();
  });

  test('não está desabilitado quando disabled é false ou não especificado', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByText('Clique aqui');
    expect(button).not.toBeDisabled();
  });
});
