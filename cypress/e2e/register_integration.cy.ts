describe('Teste de Integração - Página de Registro', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('deve carregar a página de registro corretamente', () => {
    cy.url().should('include', '/register');
    cy.contains('h2', 'Cadastro').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Senha"]').should('be.visible');
    cy.get('input[placeholder="Confirmar senha"]').should('be.visible');
    cy.contains('button', 'Cadastrar').should('be.visible');
    cy.contains('a', 'Entrar').should('be.visible');
  });

  it('deve mostrar validação de senha em tempo real', () => {
    cy.get('input[placeholder="Senha"]').type('senha');
    cy.contains('• Deve ter no mínimo de 6 caracteres').should('have.class', 'text-red-400');
    cy.contains('• Deve ter pelo menos uma letra maiúscula').should('have.class', 'text-red-400');
    cy.contains('• Deve ter pelo menos um número').should('have.class', 'text-red-400');
    
    cy.get('input[placeholder="Senha"]').clear().type('Senha123');
    cy.contains('• Deve ter no mínimo de 6 caracteres').should('have.class', 'text-green-400');
    cy.contains('• Deve ter pelo menos uma letra maiúscula').should('have.class', 'text-green-400');
    cy.contains('• Deve ter pelo menos um número').should('have.class', 'text-green-400');
  });

  it('deve mostrar erro quando senhas não coincidem', () => {
    cy.get('input[placeholder="Email"]').type('teste@exemplo.com');
    cy.get('input[placeholder="Senha"]').type('Senha123');
    cy.get('input[placeholder="Confirmar senha"]').type('Senha456');
    cy.contains('button', 'Cadastrar').should('be.disabled');
    cy.contains('button', 'Cadastrar').should('have.class', 'bg-gray-400');
    cy.contains('As senhas devem ser iguais').should('be.visible');
  });

  it('deve mostrar/ocultar senha ao clicar no ícone', () => {
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'password');
    cy.get('input[placeholder="Senha"]').parent().find('button').first().click();
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'text');
    cy.get('input[placeholder="Senha"]').parent().find('button').first().click();
    cy.get('input[placeholder="Senha"]').should('have.attr', 'type', 'password');
  });

  it('deve navegar para a página de login ao clicar no link', () => {
    cy.contains('a', 'Entrar').click();
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login').should('be.visible');
  });

  it('deve mostrar erro ao tentar registrar com campos vazios', () => {
    // O botão deve estar desabilitado quando os campos estão vazios
    cy.contains('button', 'Cadastrar').should('be.disabled');
    cy.contains('button', 'Cadastrar').should('have.class', 'bg-gray-400');
  });

  it('deve habilitar o botão de cadastrar quando os critérios forem atendidos', () => {
    cy.get('input[placeholder="Email"]').type('teste@exemplo.com');
    cy.get('input[placeholder="Senha"]').type('Senha123');
    cy.get('input[placeholder="Confirmar senha"]').type('Senha123');
    
    cy.contains('button', 'Cadastrar').should('not.have.class', 'bg-gray-400');
    cy.contains('button', 'Cadastrar').should('have.class', 'bg-green-600');
  });
});
