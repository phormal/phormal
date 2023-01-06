describe('Errors', () => {

  it('Should throw error for faulty config.validation', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Invalid value for config option "validation"')
      done()

      return false
    })

    cy.visit('#/e2e/errors?error=validationinvalid')
  })
})