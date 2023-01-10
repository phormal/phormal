describe('Errors', () => {

  it('Should throw an error if an field is defined with an invalid type', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include('[Phormal] Invalid field type. The following are allowed: email, password, select, checkbox, text, number, radiogroup')
      expect(err.name).to.equal('FormFieldError')
      done()

      return false
    })

    cy.visit('#/e2e/errors?error=fieldtypeinvalid')
  })
})