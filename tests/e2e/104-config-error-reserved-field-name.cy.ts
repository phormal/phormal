describe('Errors', () => {

  it('Should throw error for usage of reserved field names', done => {
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include(
        'The following words are reserved by the library, and cannot be used as field names: _init, $values, $validate, _setValue'
      )

      expect(err.name).to.equal('ConfigError')

      done()

      return false
    })

    cy.visit('#/e2e/errors?error=reservedfieldname')
  })
})