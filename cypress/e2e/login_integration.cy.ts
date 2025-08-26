describe('Teste de Integração - Página de Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve carregar a página de login corretamente', () => {
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Senha"]').should('be.visible');
    cy.contains('button', 'Entrar').should('be.visible');
    cy.contains('button', 'Entrar com Google').should('be.visible');
    cy.contains('a', 'Cadastre-se').should('be.visible');
  });

  it('deve mostrar/ocultar senha ao clicar no ícone', () => {
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'password');
    cy.get('input[placeholder="Senha"]').parent().find('button').first().click();
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'text');
    cy.get('input[placeholder="Senha"]').parent().find('button').first().click();
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'password');
  });

  it('deve navegar para a página de registro ao clicar no link', () => {
    cy.contains('a', 'Cadastre-se').click();
    cy.url().should('include', '/register');
    cy.contains('h2', 'Cadastro').should('be.visible');
  });

  it('deve mostrar erro ao tentar fazer login com credenciais inválidas', () => {
    cy.get('input[placeholder="Email"]').type('email@invalido.com');
    cy.get('input[placeholder="Senha"]').type('senhainvalida');
    cy.contains('button', 'Entrar').click();
    cy.get('.text-red-500').should('be.visible');
    cy.contains('Email ou senha inválidos').should('be.visible');
  });

  it('deve habilitar o botão de entrar quando os campos estiverem preenchidos', () => {
    cy.get('input[placeholder="Email"]').type('teste@exemplo.com');
    cy.get('input[placeholder="Senha"]').type('Senha123');
    
    cy.contains('button', 'Entrar').should('not.have.class', 'bg-gray-400');
    cy.contains('button', 'Entrar').should('have.class', 'bg-blue-600');
  });

  it('deve desabilitar o botão de entrar quando os campos estiverem vazios', () => {
    cy.contains('button', 'Entrar').should('have.class', 'bg-gray-400');
  });

  it('deve mostrar loading no botão durante o login', () => {
    cy.get('input[placeholder="Email"]').type('teste@exemplo.com');
    cy.get('input[placeholder="Senha"]').type('Senha123');
    cy.contains('button', 'Entrar').click();
    
    // Verificar se o botão mostra "Entrando..." durante o loading
    cy.contains('button', 'Entrando...').should('be.visible');
  });
});
