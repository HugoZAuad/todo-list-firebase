// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
}

interface MockAuth {
  currentUser: MockUser | null;
  onAuthStateChanged: (callback: (user: MockUser | null) => void) => () => void;
  signOut: () => Promise<void>;
}

interface MockFirebase {
  auth: () => MockAuth;
}

// Mock de autenticação para testes
// @ts-expect-error: Cypress types are available globally
Cypress.on('window:before:load', (win: Window & { firebase?: MockFirebase }) => {
  // Mock do Firebase Auth
  win.firebase = {
    auth: () => ({
      currentUser: {
        uid: 'test-user-id',
        email: 'test@example.com',
        displayName: 'Test User'
      },
      onAuthStateChanged: (callback: (user: MockUser | null) => void) => {
        callback({
          uid: 'test-user-id',
          email: 'test@example.com',
          displayName: 'Test User'
        });
        return () => {};
      },
      signOut: () => Promise.resolve()
    })
  };

  // Mock do localStorage para simular autenticação
  win.localStorage.setItem('user', JSON.stringify({
    uid: 'test-user-id',
    email: 'test@example.com',
    displayName: 'Test User'
  }));
});
