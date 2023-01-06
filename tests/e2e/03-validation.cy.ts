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

  const faultyEmail = 'test@test'
  const correctEmail = 'test@test.com'

  const testEmailErrorDoesNotExist = () => {
    // First a negative check
    cy
      .get('#phormal-field-error-emailField')
      .should('not.exist')
  }

  const testEmailIsFaulty = () => {
    // Then type in the faulty email
    cy
      .get('#phormal-field-input-emailField')
      .type(faultyEmail)

    // There should be an error, because the email is faulty
    cy
      .get('#phormal-field-error-emailField')
      .should('exist')
  }

  it('Should display an error for a faulty email', () => {
    testEmailErrorDoesNotExist()
    testEmailIsFaulty()
  })

  it('Removes the email error when the email is corrected', () => {
    testEmailErrorDoesNotExist()
    testEmailIsFaulty()

    // Correct the email
    cy
      .get('#phormal-field-input-emailField')
      .clear()
      .type(correctEmail)

    // There should be no error, because the email is correct
    cy
      .get('#phormal-field-error-emailField')
      .should('not.exist')
  })

  it('Should display an error for a faulty regex', () => {
    cy
      .get('#phormal-field-error-field3')
      .should('not.exist')

    const stringOfNumbers = 'testtest123'

    cy
      .get('#phormal-field-input-field3')
      .type(stringOfNumbers)

    cy
      .get('#phormal-field-error-field3')
      .should('exist')
      .should('contain.text', 'Input does not have expected format')
  })

  it('Should display an error message with a provided format in useRegex', () => {
    cy
      .get('#phormal-field-error-birthdateField')
      .should('not.exist')

    const stringOfNumbers = 'testtest123'

    cy
      .get('#phormal-field-input-birthdateField')
      .type(stringOfNumbers)

    cy
      .get('#phormal-field-error-birthdateField')
      .should('exist')
      .should('have.text', 'Input does not have expected format. Expected format: YYYY-MM-DD')

    cy
      .get('#phormal-field-input-birthdateField')
      .clear()
      .type('2020-01-01')

    cy
      .get('#phormal-field-error-birthdateField')
      .should('not.exist')
  })
})

export {}