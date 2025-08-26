import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/card';
import '@testing-library/jest-dom';

describe('Componente Card', () => {
  test('renderiza card com conteúdo', () => {
    render(<Card>Conteúdo do card</Card>);
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  test('aplica classes CSS padrão', () => {
    const { container } = render(<Card>Conteúdo do card</Card>);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('dark:bg-zinc-700');
  });

  test('aplica className customizada', () => {
    const { container } = render(<Card className="minha-classe">Conteúdo do card</Card>);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('minha-classe');
  });

  test('renderiza elementos React como children', () => {
    render(
      <Card>
        <h1>Título</h1>
        <p>Parágrafo</p>
      </Card>
    );
    
    expect(screen.getByRole('heading', { name: 'Título' })).toBeInTheDocument();
    expect(screen.getByText('Parágrafo')).toBeInTheDocument();
  });

  test('não quebra quando children é vazio', () => {
    const { container } = render(<Card>{null}</Card>);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card).toBeEmptyDOMElement();
  });
});
