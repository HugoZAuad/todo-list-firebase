describe('Teste de Integração - Página de Tarefas', () => {
  before(() => {
    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('teste@exemplo.com');
    cy.get('input[placeholder="Senha"]').type('Senha123');
    cy.contains('button', 'Entrar').click({ force: true });
    cy.url().should('include', '/tarefas');
  });

  beforeEach(() => {
    cy.visit('/tarefas');

    cy.window().then((win) => {
      const tourCompleted = win.localStorage.getItem('tourCompleted');
      if (tourCompleted !== 'true') {
        cy.contains('button', 'Pular', { timeout: 1000 }).should('be.visible').click({ force: true });
      }
    });
  });

  it('deve carregar a página de tarefas corretamente', () => {
    cy.contains('Minhas Tarefas').should('be.visible');
    cy.contains('button', 'Adicionar Tarefa').should('be.visible');
    cy.contains('button', 'Todos').should('be.visible');
    cy.contains('button', 'Pendentes').should('be.visible');
    cy.contains('button', 'Concluídos').should('be.visible');
    cy.get('button.theme-toggle').should('be.visible');
    cy.contains('button', 'Logout').should('be.visible');
  });

  it('deve adicionar uma nova tarefa', () => {
    cy.contains('button', 'Adicionar Tarefa').click({ force: true });
    cy.get('textarea').last().type('Nova tarefa de teste{enter}');
    cy.contains('Salvar').click();
    cy.contains('Nova tarefa de teste').should('be.visible');
  });

  it('deve editar uma tarefa existente', () => {
    cy.contains('button', 'Adicionar Tarefa').click({ force: true });
    cy.get('textarea').last().type('Tarefa para editar{enter}');
    cy.contains('Salvar').click();

    cy.get('button').find('svg').last().click();
    cy.get('textarea').last().clear().type('Tarefa editada{enter}');
    cy.contains('Salvar').click();
    cy.contains('Tarefa editada').should('be.visible');
  });

  it('deve concluir uma tarefa', () => {
    cy.contains('button', 'Adicionar Tarefa').click({ force: true });
    cy.get('textarea').last().type('Tarefa para concluir{enter}');
    cy.contains('Salvar').click();

    cy.contains('Concluir').click();
    cy.contains('span', 'Concluido').should('be.visible');
  });

it('deve filtrar tarefas por status', () => {
  cy.contains('button', 'Adicionar Tarefa').click({ force: true });
  cy.get('textarea').last().type('Tarefa pendente{enter}');
  cy.contains('Salvar').click();
  cy.contains('button', 'Adicionar Tarefa').click({ force: true });
  cy.get('textarea').last().type('Tarefa concluída{enter}');
  cy.contains('Salvar').click();
  cy.contains('Concluir').last().click();
  cy.wait(1000);  
  cy.contains('button', 'Pendentes').click();
  cy.contains('button', 'Concluídos').click();  
});

  it('deve excluir uma tarefa', () => {
    cy.contains('button', 'Adicionar Tarefa').click({ force: true });
    cy.get('textarea').last().type('Tarefa para excluir{enter}');
    cy.contains('Salvar').click();

    cy.contains('Tarefa para excluir').should('be.visible');
    cy.contains('Excluir').click();
  });

  it('deve alternar o tema', () => {
    cy.get('button.theme-toggle').click();
    cy.wait(1000);
    cy.get('button.theme-toggle').click();
    cy.wait(1000);
  });

  it('deve fazer logout', () => {
    cy.contains('button', 'Logout').click();
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login').should('be.visible');
  });
});
