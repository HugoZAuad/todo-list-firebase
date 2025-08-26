# To-Do List Firebase

Uma aplicação web moderna de lista de tarefas com autenticação de usuários, interface responsiva e funcionalidades avançadas como drag-and-drop.

## 🚀 Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: React 18 + Vite
- **Estilização**: Tailwind CSS
- **Backend**: Firebase
  - Firebase Authentication (Email/Password + Google)
  - Cloud Firestore (Banco de dados)
- **Bibliotecas**:
  - @dnd-kit (Drag and Drop)
  - react-joyride (Sistema de Tour)
  - react-router-dom (Roteamento)
  - react-hot-toast (Notificações)

## 📋 Funcionalidades

### 🔐 Autenticação
- Cadastro de novos usuários (email e senha)
- Login com email/senha
- Login social com Google
- Sessões persistentes
- Logout seguro

### ✅ Gerenciamento de Tarefas (CRUD Completo)
- **Criar**: Adicionar novas tarefas com título
- **Ler**: Visualizar tarefas em tempo real
- **Atualizar**: 
  - Editar texto das tarefas
  - Marcar como concluída/pendente
  - Reordenar com drag-and-drop
- **Excluir**: Remover tarefas permanentemente

### 🎨 Interface e UX
- Design responsivo (desktop and mobile)
- Tema escuro/claro
- Filtros de visualização (Todos, Pendentes, Concluídas)
- Feedback visual para todas as ações
- Sistema de tour para novos usuários
- Animações e transições suaves

## 🏗️ Arquitetura e Estrutura Detalhada

### Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── alertManager.tsx        # Gerenciamento de alertas e notificações
│   ├── button.tsx              # Componente de botão estilizável
│   ├── card.tsx                # Container para exibir conteúdo em cards
│   ├── googleLoginButton.tsx   # Botão de login com Google OAuth
│   ├── input.tsx               # Componente de input com validação
│   ├── loadingSpinner.tsx      # Indicador visual de carregamento
│   ├── navbar.tsx              # Barra de navegação principal
│   ├── taskitem.tsx            # Item individual de tarefa (CRUD)
│   ├── taskList.tsx            # Lista com drag-and-drop (@dnd-kit)
│   └── Tour.tsx                # Sistema de tour guiado (react-joyride)
├── hooks/              # Custom hooks para lógica reutilizável
│   ├── useAlert.ts     # Gerenciamento de alertas toast
│   ├── useSessions.ts  # Autenticação e sessão do usuário
│   └── useTheme.ts     # Toggle entre temas claro/escuro
├── pages/              # Páginas principais da aplicação
│   ├── login.tsx       # Página de autenticação
│   ├── register.tsx    # Página de cadastro
│   └── tasks.tsx       # Página principal de gerenciamento
├── services/           # Serviços para comunicação externa
│   └── taskService.ts  # Operações CRUD no Firebase Firestore
├── styles/             # Arquivos de estilização
│   ├── global.css      # Estilos globais e variáveis CSS
│   ├── taskitem.css    # Estilos específicos para itens
│   └── tasklist.css    # Estilos para lista e drag-and-drop
├── types/              # Definições TypeScript
│   └── tasks.ts        # Interfaces e tipos para tarefas
├── utils/              # Utilitários e funções auxiliares
│   └── alert.ts        # Sistema de exibição de alertas
└── tests/              # Testes automatizados
    ├── components/     # Testes unitários de componentes
    ├── integration/    # Testes de integração de fluxos
    └── __mocks__/      # Mocks para dependências externas
```

### 🔧 Componentes Detalhados

#### Gerenciamento de Estado
- **useSessions**: Gerencia autenticação do usuário com Firebase Auth
- **useTheme**: Controla tema claro/escuro com persistência no localStorage
- **useAlert**: Sistema unificado de notificações toast

#### Interface do Usuário
- **Design System**: Componentes atômicos reutilizáveis (Button, Input, Card)
- **Responsividade**: Layout mobile-first com Tailwind CSS
- **Acessibilidade**: ARIA labels e navegação por teclado

#### Integração com Firebase
- **Firestore**: Estrutura de dados organizada por usuário
- **Security Rules**: Proteção de dados com regras de segurança
- **Real-time Updates**: Atualizações em tempo real

## 🧪 Testes e Cobertura

### Estratégia de Testes
- **Testes Unitários**: Cobertura completa de componentes individuais
- **Testes de Integração**: Verificação de fluxos completos de usuário
- **Testes de UI**: Interações e comportamentos visuais

### Estrutura de Testes

```
src/tests/
├── components/              # Testes unitários de componentes
│   ├── alertManager.test.tsx    # Testes de gerenciamento de alertas
│   ├── button.test.tsx          # Testes de interação de botões
│   ├── card.test.tsx            # Testes de renderização de cards
│   ├── googleLoginButton.test.tsx # Testes de autenticação Google
│   ├── input.test.tsx           # Testes de validação de inputs
│   ├── loadingSpinner.test.tsx  # Testes de estados de carregamento
│   ├── navbar.test.tsx          # Testes de navegação
│   ├── taskitem.test.tsx        # Testes de CRUD de tarefas
│   ├── taskList.test.tsx        # Testes de drag-and-drop
│   └── tour.test.tsx            # Testes do sistema de tour
├── integration/             # Testes de integração
│   ├── login.test.tsx      # Fluxo completo de autenticação
│   └── (outros testes de integração)
└── __mocks__/              # Mocks para testes
    └── firebase/
        └── config.ts       # Mock da configuração do Firebase
```

### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura detalhada
npm run test:coverage

# Executar testes em modo watch para desenvolvimento
npm run test:watch

# Executar testes específicos
npm test src/tests/components/taskList.test.tsx
npm test src/tests/integration/login.test.tsx
```

### Tecnologias de Teste
- **Jest**: Framework de testes com suporte a TypeScript
- **React Testing Library**: Testes focados em comportamento do usuário
- **Mocking**: Isolamento de dependências externas (Firebase)
- **Coverage Reporting**: Relatórios detalhados de cobertura de código

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Firebase Console

### Configuração do Firebase

1. **Crie um projeto** no [Firebase Console](https://console.firebase.google.com/)
2. **Ative Authentication** com provedores Email/Password e Google
3. **Configure Firestore Database** com as seguintes regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite que usuários autenticados acessem apenas suas próprias tarefas
    match /tasks/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Instalação e Execução

1. **Clone e instalação**
```bash
git clone <url-do-repositorio>
cd todo-list-firebase
npm install
```

2. **Configuração de ambiente**
Crie `.env` na raiz com:
```env
VITE_FIREBASE_API_KEY=sua_chave_api
VITE_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

3. **Desenvolvimento**
```bash
npm run dev
```

4. **Produção**
```bash
npm run build
npm run preview
```

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento Vite |
| `npm run build` | Build de produção otimizado |
| `npm run preview` | Preview local do build |
| `npm run lint` | Análise estática com ESLint |
| `npm test` | Executa suite completa de testes |
| `npm run test:coverage` | Testes com relatório de cobertura |
| `npm run test:watch` | Modo watch para desenvolvimento |

## 🎯 Diferenciais Técnicos

### TypeScript Implementation
- **Type Safety**: Interfaces completas para todos os componentes
- **Generic Components**: Componentes reutilizáveis com tipos genéricos
- **API Typing**: Tipagem precisa para operações Firebase

### Performance Optimizations
- **Code Splitting**: Carregamento lazy de componentes
- **Memoization**: Uso de React.memo e useMemo para performance
- **Efficient Rerenders**: Minimização de rerenders desnecessários

### UX Excellence
- **Loading States**: Feedback visual para todas as operações async
- **Error Handling**: Tratamento elegante de erros
- **Progressive Enhancement**: Funcionalidade básica sem JS

## 🔒 Segurança e Boas Práticas

- **Environment Variables**: Configurações sensíveis protegidas
- **Input Validation**: Validação no client e server
- **XSS Protection**: Sanitização de dados do usuário
- **CORS Configuration**: Políticas de origem restritas

## 📱 Responsividade e Acessibilidade

### Breakpoints Responsivos
- **Mobile**: < 768px (layout vertical)
- **Tablet**: 768px - 1023px (grid adaptativo)  
- **Desktop**: 1024px+ (layout completo)

### Recursos de Acessibilidade
- **Keyboard Navigation**: Navegação completa por teclado
- **Screen Reader Support**: ARIA labels semânticos
- **Color Contrast**: Contraste adequado para visibilidade
- **Focus Management**: Gerenciamento inteligente de foco

## 🚀 Deploy e DevOps

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Variáveis de Ambiente
Configure as variáveis no painel do seu serviço de hosting para deploy production.

### Monitoramento
- **Error Tracking**: Integração com serviços de monitoramento
- **Performance Metrics**: Métricas de carregamento e interação
- **Usage Analytics**: Análise de uso e engajamento

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch: `git checkout -b feature/nova-feature`
3. Commit suas changes: `git commit -am 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

### Guidelines de Código
- Siga as convenções de TypeScript
- Mantenha cobertura de testes alta
- Documente novas funcionalidades
- Teste em múltiplos dispositivos

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ usando React, TypeScript e Firebase**
