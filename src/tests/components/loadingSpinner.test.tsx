import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../../components/loadingSpinner';
import '@testing-library/jest-dom';

describe('Componente LoadingSpinner', () => {
  test('renderiza o spinner', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('aplica classes CSS corretas', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('h-6');
    expect(spinner).toHaveClass('w-6');
    expect(spinner).toHaveClass('border-t-2');
    expect(spinner).toHaveClass('border-b-2');
    expect(spinner).toHaveClass('border-blue-500');
  });

  test('está dentro de um container flex', () => {
    const { container } = render(<LoadingSpinner />);
    
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass('flex');
    expect(containerDiv).toHaveClass('justify-center');
    expect(containerDiv).toHaveClass('items-center');
  });
});
