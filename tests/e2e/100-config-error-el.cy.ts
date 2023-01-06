describe('Errors', () => {

  it('Should not try to render form when config.el does not exist in DOM', () => {
    cy.visit('#/e2e/errors?error=elnoexist')

    cy
      .get('.phlib')
      .should('not.exist')
  })

  it('Should throw error when config.el is an invalid selector', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Config property "el", needs to be a unique HTML selector')

      done()

      return false
    })

    cy.visit('#/e2e/errors?error=elinvalidselector')
  })
})