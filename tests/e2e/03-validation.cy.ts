function testDisplayingMaxLengthError() {
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
}

function testDisplayingMinLengthError() {
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
}

function testUseEmail() {
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
}

function testDisplayingErrorForFaultyRegex() {
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
}

function testDisplayingErrorForRegexWithReadableFormat() {
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
}

function testDisplayingErrorForInvalidURL() {
  it('Shows an error message for an invalid url', () => {
    cy
      .get('#phormal-field-error-url')
      .should('not.exist')

    cy
      .get('#phormal-field-input-url')
      .type('test')

    cy
      .get('#phormal-field-error-url')
      .should('exist')
      .should('have.text', 'Not a valid URL')

    cy
      .get('#phormal-field-input-url')
      .clear()
      .type('https://www.google.com')

    cy
      .get('#phormal-field-error-url')
      .should('not.exist')
  })
}

function testDisplayingErrorForDisallowedURLHost() {
  it('Shows an error message for an invalid host in a url', () => {
    cy
      .get('#phormal-field-error-urlInvalidHost')
      .should('not.exist')

    cy
      .get('#phormal-field-input-urlInvalidHost')
      .type('https://test')

    cy
      .get('#phormal-field-error-urlInvalidHost')
      .should('exist')
      .should('have.text', 'The URL host is not valid. Allowed hosts are: google.com, google.nl, google.be')

    cy
      .get('#phormal-field-input-urlInvalidHost')
      .clear()
      .type('https://google.com')

    cy
      .get('#phormal-field-error-urlInvalidHost')
      .should('not.exist')
  })
}

function testDisplayingErrorForDisallowedURLProtocol() {
  it('Shows an error message for an invalid protocol in a url', () => {
    cy
      .get('#phormal-field-error-urlInvalidProtocol')
      .should('not.exist')

    cy
      .get('#phormal-field-input-urlInvalidProtocol')
      .type('http://google.com')

    cy
      .get('#phormal-field-error-urlInvalidProtocol')
      .should('exist')
      .should('have.text', 'The URL protocol is not valid. Allowed protocols are: https, file:')

    cy
      .get('#phormal-field-input-urlInvalidProtocol')
      .clear()
      .type('https://google.com')

    cy
      .get('#phormal-field-error-urlInvalidProtocol')
      .should('not.exist')
  })
}

function testUpdatingDependantOnDependencyUpdate() {
  it('Validates dependant field when updating its dependency', () => {
    cy
      .get('#phormal-field-input-country')
      .click()
      .get('#phlib__select-option-country-0')
      .click()

    cy.get('#phormal-field-input-zip')
      .type('12XXX!!?JH')
      .blur()
      .get('#phormal-field-error-zip')
      .should('exist')
  });
}

describe('Active validation', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/validation')
  })

  testDisplayingMaxLengthError();
  testDisplayingMinLengthError();
  testUseEmail();
  testDisplayingErrorForFaultyRegex();
  testDisplayingErrorForRegexWithReadableFormat();
  testDisplayingErrorForInvalidURL();
  testDisplayingErrorForDisallowedURLHost();
  testDisplayingErrorForDisallowedURLProtocol();
  testUpdatingDependantOnDependencyUpdate();

  it('Displays an error for value lower than a given numeric minimum value', () => {
    cy
      .get('#phormal-field-error-minNumeric')
      .should('not.exist')

    cy
      .get('#phormal-field-input-minNumeric')
      .type('14')

    cy
      .get('#phormal-field-error-minNumeric')
      .should('exist')
      .should('have.text', 'Value is lower than the minimum value of 15')

    cy
      .get('#phormal-field-input-minNumeric')
      .clear()
      .type('15')

    cy
      .get('#phormal-field-error-minNumeric')
      .should('not.exist')
  })

  it('Displays an error for value higher than a given numeric maximum value', () => {
    cy
      .get('#phormal-field-error-maxNumeric')
      .should('not.exist')

    cy
      .get('#phormal-field-input-maxNumeric')
      .type('16')

    cy
      .get('#phormal-field-error-maxNumeric')
      .should('exist')
      .should('have.text', 'Value is higher than the maximum value of 15')

    cy
      .get('#phormal-field-input-maxNumeric')
      .clear()
      .type('15')

    cy
      .get('#phormal-field-error-maxNumeric')
      .should('not.exist')
  })

  it('Displays an error for a value not between a given numeric minimum and maximum value', () => {
    cy
      .get('#phormal-field-error-minMaxNumeric')
      .should('not.exist')

    cy
      .get('#phormal-field-input-minMaxNumeric')
      .type('14')

    cy
      .get('#phormal-field-error-minMaxNumeric')
      .should('exist')
      .should('have.text', 'Value is not between the minimum value of 15 and the maximum value of 16')

    cy
      .get('#phormal-field-input-minMaxNumeric')
      .clear()
      .type('17')

    cy
      .get('#phormal-field-error-minMaxNumeric')
      .should('exist')
      .should('have.text', 'Value is not between the minimum value of 15 and the maximum value of 16')

    cy
      .get('#phormal-field-input-minMaxNumeric')
      .clear()
      .type('15')

    cy
      .get('#phormal-field-error-minMaxNumeric')
      .should('not.exist')
  })
})

describe('Passive validation', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/validation?type=passive')
  })

  const errorMsgText = `This field must be at most ${10} characters long`
  const errorMsgEl = '#phormal-field-error-field1'

  it('Should not display an error upon typing a faulty input', () => {
    it('Should display an error "maxLength"', () => {

      cy
        .get(errorMsgEl)
        .should('not.exist')

      cy
        .get('#phormal-field-input-field1')
        .type('test test test')

      cy
        .get(errorMsgEl)
        .should('not.exist')
    })
  })

  it('Should not validate checkbox on input', () => {
    // Click checkbox twice, to make value first true, then false (which should yield validation error when validation fires)
    cy
      .get('#phormal-field-input-newsletter')
      .click()
      .click()

    // There should be no error, because the checkbox is not validated on input
    cy
      .get('#phormal-field-error-newsletter')
      .should('not.exist')

    // Trigger validation
    cy
      .get('#validate-button')
      .click()

    // There should be an error, because the checkbox is false
    cy
      .get('#phormal-field-error-newsletter')
      .should('exist')
  })

  it('Should validate and display an error when the $validate function is called', () => {
    cy
      .get('#phormal-field-input-field1')
      .type('test test test')

    cy
      .get('#phormal-field-error-field1')
      .should('not.exist')

    cy
      .get('#validate-button')
      .click()

    cy
      .get(errorMsgEl)
      .should('exist')
      .should('have.text', errorMsgText)
  })

  it('Should not display an error message for a dependent field, when the dependency is updated', () => {
    cy
      .get('#phormal-field-input-country')
      .click()
      .get('#phlib__select-option-country-0')
      .click()

    cy.get('#phormal-field-input-zip')
      .type('12XXX!!?JH')
      .blur()
      .get('#phormal-field-error-zip')
      .should('not.exist')

    cy
      .get('#validate-button')
      .click()

    cy
      .get('#phormal-field-error-zip')
      .should('exist')
  })
})

export {}
