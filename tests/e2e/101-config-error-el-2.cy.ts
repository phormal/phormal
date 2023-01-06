describe('Errors', () => {

  it('Should throw error for missing config.el', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Missing required config property "el"')
      done()

      return false
    })

    cy.visit('#/e2e/errors?error=elnotconfigured')
  })
})