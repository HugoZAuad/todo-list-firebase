# To-Do List Firebase

Uma aplicação web moderna de lista de tarefas com autenticação de usuários, interface responsiva e funcionalidades avançadas como drag-and-drop.

## 🚀 Tecnologias Utilizadas

- **Linguagem**: JavaScript
- **Framework**: React 18 + TypeScript
- **Estilização**: Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Firebase
  - Firebase Authentication (Email/Password + Google)
  - Cloud Firestore (Banco de dados)
- **Bibliotecas**:
  - react-beautiful-dnd (Drag and Drop)
  - react-joyride (Sistema de Tour)
  - react-toastify (Notificações)

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
- Design responsivo (desktop e mobile)
- Tema escuro/claro
- Filtros de visualização (Todos, Pendentes, Concluídas)
- Feedback visual para todas as ações
- Sistema de tour para novos usuários
- Animações e transições suaves

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase

### Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative o Authentication (Email/Password e Google)
3. Crie um banco Firestore
4. Configure as regras de segurança:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd todo-list-firebase
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Execute em modo desenvolvimento**
```bash
npm run dev
```

5. **Build para produção**
```bash
npm run build
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Tour.tsx        # Sistema de tour
│   ├── navbar.tsx      # Barra de navegação
│   ├── taskList.tsx    # Lista de tarefas com drag-and-drop
│   ├── taskitem.tsx    # Item individual de tarefa
│   └── ... outros componentes
├── pages/              # Páginas da aplicação
│   ├── login.tsx       # Página de login
│   ├── register.tsx    # Página de registro
│   └── tasks.tsx       # Página principal de tarefas
├── services/           # Serviços externos
│   └── taskService.ts  # Serviço do Firebase Firestore
├── hooks/              # Custom hooks
│   ├── useAlert.ts     # Gerenciamento de alertas
│   ├── useSessions.ts  # Gerenciamento de sessão
│   └── useTheme.ts     # Gerenciamento de tema
├── types/              # Definições TypeScript
│   └── tasks.ts        # Tipos de tarefas
└── utils/              # Utilitários
    └── alert.ts        # Sistema de alertas
```

## 🔧 Configuração do Firebase

O projeto utiliza as seguintes configurações do Firebase:

- **Authentication**: Suporte a email/senha e provedor Google
- **Firestore**: Banco de dados NoSQL em tempo real
- **Security Rules**: Regras de segurança para proteger dados dos usuários

## 🎯 Diferenciais Implementados

- ✅ **TypeScript** para type safety
- ✅ **Drag-and-drop** com react-beautiful-dnd
- ✅ **Sistema de tour** com react-joyride
- ✅ **Login social** com Google
- ✅ **Design responsivo** com Tailwind CSS
- ✅ **Tema escuro/claro**
- ✅ **Notificações toast**
- ✅ **Filtros avançados** de tarefas

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🚀 Deploy

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Variáveis de Ambiente no Deploy
Configure as variáveis de ambiente no painel do seu serviço de hosting.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para o processo seletivo ITNSify
