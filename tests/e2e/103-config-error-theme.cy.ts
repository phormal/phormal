describe('Errors', () => {

  it('Should throw error for faulty config.theme', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Unknown theme name')
      done()

      return false
    })

    cy.visit('#/e2e/errors?error=themeinvalid')
  })
})