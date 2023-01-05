describe('Validation', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/validation')
  })

  it('Should display an error "maxLength"', () => {
    const errorMsgText = `This field must be at most ${10} characters long`
    const errorMsgEl = '#phormal-field-error-field1'

    cy
      .get(errorMsgEl)
      .should('not.exist')

    cy
      .get('#phormal-field-input-field1')
      .type('test test test')

    cy
      .get(errorMsgEl)
      .should('exist')
      .should('have.text', errorMsgText)
  })

  it('Should display an error "minLength"', () => {
    const tooShortMessage = 't'
    const longEnoughMessage = 'testtest'

    // Type once, to trigger validation
    cy
      .get('#phormal-field-input-field2')
      .type(tooShortMessage)

    // There should be an error, because the message is too short
    cy
      .get('#phormal-field-error-field2')
      .should('exist')

    cy
      .get('#phormal-field-input-field2')
      .type(longEnoughMessage)

    cy
      .get('#phormal-field-error-field2')
      .should('not.exist')
  });

  it('Should display an error for a faulty email', () => {
    // First a negative check
    cy
      .get('#phormal-field-error-emailField')
      .should('not.exist')

    const faultyEmail = 'test@test'
    const correctEmail = 'test@test.com'

    // Then type in the faulty email
    cy
      .get('#phormal-field-input-emailField')
      .type(faultyEmail)

    // There should be an error, because the email is faulty
    cy
      .get('#phormal-field-error-emailField')
      .should('exist')
  })
})

export {}