import React from 'react'
import Joyride, { Step, CallBackProps } from 'react-joyride'

interface TourProps {
  run: boolean
  setRun: (run: boolean) => void
}

const Tour: React.FC<TourProps> = ({ run, setRun }) => {
  const steps: Step[] = [
    {
      target: 'body',
      content: 'Bem-vindo ao seu gerenciador de tarefas! Vamos fazer um tour rápido para você conhecer as funcionalidades.',
      placement: 'center',
    },
    {
      target: '.navbar-tabs',
      content: 'Aqui você pode filtrar suas tarefas por status: Todas, Pendentes ou Concluídas.',
    },
    {
      target: '.add-task-button',
      content: 'Use este botão para adicionar novas tarefas à sua lista.',
    },
    {
      target: '.task-item',
      content: 'Cada tarefa pode ser editada, marcada como concluída ou excluída. Arraste para reordenar!',
    },
    {
      target: '.theme-toggle',
      content: 'Mude entre tema claro e escuro conforme sua preferência.',
    },
    {
      target: '.logout-button',
      content: 'Aqui você pode fazer logout da sua conta.',
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    
    if (status === 'finished' || status === 'skipped') {
      setRun(false)
      localStorage.setItem('tourCompleted', 'true')
    }
  }

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#8B5CF6',
          textColor: '#1F2937',
          backgroundColor: '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      locale={{
        back: 'Voltar',
        close: 'Fechar',
        last: 'Finalizar',
        next: 'Próximo',
        skip: 'Pular',
      }}
    />
  )
}

export default Tour
