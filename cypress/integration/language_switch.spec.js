describe('Language switching', () => {
  it('switches to Arabic and verifies dir attribute', () => {
    cy.visit('http://localhost:5173');
    cy.contains('العربية').click();
    cy.document().its('documentElement.dir').should('equal','rtl');
  });
});
