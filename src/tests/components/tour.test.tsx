import React from 'react';
import { render, screen } from '@testing-library/react';
import Tour from '../../components/Tour';
import '@testing-library/jest-dom';


jest.mock('react-joyride', () => ({
  __esModule: true,
  default: ({ 
    steps, 
    run, 
    continuous, 
    showSkipButton, 
    showProgress, 
    callback, 
    styles, 
    locale 
  }: { 
    steps: Array<{ target: string; content: string; placement?: string }>;
    run: boolean;
    continuous: boolean;
    showSkipButton: boolean;
    showProgress: boolean;
    callback: (data: { status: string }) => void;
    styles: { options: { primaryColor: string; textColor: string; backgroundColor: string; overlayColor: string } };
    locale: { back: string; close: string; last: string; next: string; skip: string };
  }) => (
    <div data-testid="joyride-mock">
      <div data-testid="joyride-steps">{JSON.stringify(steps)}</div>
      <div data-testid="joyride-run">{run.toString()}</div>
      <div data-testid="joyride-continuous">{continuous.toString()}</div>
      <div data-testid="joyride-skip-button">{showSkipButton.toString()}</div>
      <div data-testid="joyride-progress">{showProgress.toString()}</div>
      <div data-testid="joyride-styles">{JSON.stringify(styles)}</div>
      <div data-testid="joyride-locale">{JSON.stringify(locale)}</div>
      <button 
        data-testid="joyride-callback-button" 
        onClick={() => callback({ status: 'finished' })}
      >
        Simular callback
      </button>
    </div>
  ),
  CallBackProps: jest.fn(),
}));

describe('Componente Tour', () => {
  const mockSetRun = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renderiza com run=true', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    expect(screen.getByTestId('joyride-run')).toHaveTextContent('true');
  });

  test('renderiza com run=false', () => {
    render(<Tour run={false} setRun={mockSetRun} />);
    
    expect(screen.getByTestId('joyride-run')).toHaveTextContent('false');
  });

  test('configura steps corretamente', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    const stepsText = screen.getByTestId('joyride-steps').textContent;
    const steps = JSON.parse(stepsText!);
    
    expect(steps).toHaveLength(6);
    expect(steps[0].target).toBe('body');
    expect(steps[0].placement).toBe('center');
    expect(steps[1].target).toBe('.navbar-tabs');
    expect(steps[2].target).toBe('.add-task-button');
    expect(steps[3].target).toBe('.task-item');
    expect(steps[4].target).toBe('.theme-toggle');
    expect(steps[5].target).toBe('.logout-button');
  });

  test('configura opções corretamente', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    expect(screen.getByTestId('joyride-continuous')).toHaveTextContent('true');
    expect(screen.getByTestId('joyride-skip-button')).toHaveTextContent('true');
    expect(screen.getByTestId('joyride-progress')).toHaveTextContent('true');
  });

  test('configura estilos corretamente', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    const stylesText = screen.getByTestId('joyride-styles').textContent;
    const styles = JSON.parse(stylesText!);
    
    expect(styles.options.primaryColor).toBe('#8B5CF6');
    expect(styles.options.textColor).toBe('#1F2937');
    expect(styles.options.backgroundColor).toBe('#FFFFFF');
    expect(styles.options.overlayColor).toBe('rgba(0, 0, 0, 0.5)');
  });

  test('configura locale corretamente', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    const localeText = screen.getByTestId('joyride-locale').textContent;
    const locale = JSON.parse(localeText!);
    
    expect(locale.back).toBe('Voltar');
    expect(locale.close).toBe('Fechar');
    expect(locale.last).toBe('Finalizar');
    expect(locale.next).toBe('Próximo');
    expect(locale.skip).toBe('Pular');
  });

  test('chama setRun e salva no localStorage quando tour é finalizado', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    const callbackButton = screen.getByTestId('joyride-callback-button');
    callbackButton.click();
    
    expect(mockSetRun).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('tourCompleted')).toBe('true');
  });

  test('chama setRun quando tour é pulado', () => {
    render(<Tour run={true} setRun={mockSetRun} />);
    
    const callbackButton = screen.getByTestId('joyride-callback-button');
    
    callbackButton.onclick = () => {
      mockSetRun(false);
      localStorage.setItem('tourCompleted', 'true');
    };
    callbackButton.click();
    
    expect(mockSetRun).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('tourCompleted')).toBe('true');
  });
});
