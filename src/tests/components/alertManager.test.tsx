import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AlertManager } from '../../components/alertManager';
import '@testing-library/jest-dom';

describe('Componente AlertManager', () => {
  beforeEach(() => {  
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renderiza sem alertas inicialmente', () => {
    render(<AlertManager />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('adiciona alerta quando evento customizado é disparado', () => {
    render(<AlertManager />);
    
    const alertEvent = new CustomEvent('alert', {
      detail: {
        message: 'Teste de alerta',
        type: 'success'
      }
    });

    act(() => {
      window.dispatchEvent(alertEvent);
    });

    expect(screen.getByText('Teste de alerta')).toBeInTheDocument();
    expect(screen.getByText('Teste de alerta')).toHaveClass('bg-green-500');
  });

  test('remove alerta automaticamente após 3 segundos', () => {
    render(<AlertManager />);
    
    const alertEvent = new CustomEvent('alert', {
      detail: {
        message: 'Alerta temporário',
        type: 'info'
      }
    });

    act(() => {
      window.dispatchEvent(alertEvent);
    });

    expect(screen.getByText('Alerta temporário')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Alerta temporário')).not.toBeInTheDocument();
  });

  test('aplica classes CSS corretas para diferentes tipos de alerta', () => {
    render(<AlertManager />);
    
    const alertTypes = [
      { type: 'primary', expectedClass: 'bg-blue-600' },
      { type: 'success', expectedClass: 'bg-green-500' },
      { type: 'danger', expectedClass: 'bg-red-500' },
      { type: 'warning', expectedClass: 'bg-yellow-500' },
      { type: 'info', expectedClass: 'bg-cyan-500' }
    ];

    alertTypes.forEach(({ type, expectedClass }) => {
      const alertEvent = new CustomEvent('alert', {
        detail: {
          message: `Alerta ${type}`,
          type: type as "primary" | "success" | "danger" | "warning" | "info"
        }
      });

      act(() => {
        window.dispatchEvent(alertEvent);
      });

      expect(screen.getByText(`Alerta ${type}`)).toHaveClass(expectedClass);
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
    });
  });

  test('gera ID único para cada alerta', () => {
    render(<AlertManager />);
    
    const alertEvent1 = new CustomEvent('alert', {
      detail: {
        message: 'Alerta 1',
        type: 'success'
      }
    });

    const alertEvent2 = new CustomEvent('alert', {
      detail: {
        message: 'Alerta 2',
        type: 'warning'
      }
    });

    act(() => {
      window.dispatchEvent(alertEvent1);
      window.dispatchEvent(alertEvent2);
    });

    const alerts = screen.getAllByText(/Alerta \d/);
    expect(alerts).toHaveLength(2);
    expect(alerts[0]).toHaveTextContent('Alerta 1');
    expect(alerts[1]).toHaveTextContent('Alerta 2');
  });

  test('limpa event listener ao desmontar', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<AlertManager />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('alert', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
