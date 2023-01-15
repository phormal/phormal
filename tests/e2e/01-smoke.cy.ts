import {FIELD_WRAPPER_CLASS} from "@phormal/core/src/constants/css-selectors";

const FIRST_NAME_FIELD = 'input[id="phormal-field-input-firstName"]'
const LAST_NAME_FIELD = 'input[id="phormal-field-input-lastName"]'
const COUNTRY_SELECT = 'input[id="phormal-field-input-country"][role="button"]'
const ZIP_CODE_FIELD = 'input[id="phormal-field-input-zip"]'
const FIRST_NAME_ERROR = 'div[id="phormal-field-error-firstName"]'
const ZIP_CODE_ERROR = 'div[id="phormal-field-error-zip"]'

const testRenderingAllFields = () => {
  it('should render all expected fields', () => {
    cy.get(FIRST_NAME_FIELD).should('exist')
    cy.get(LAST_NAME_FIELD).should('exist')
    cy.get(COUNTRY_SELECT).should('exist')
  })
}

const testSettingDefaultValues = () => {
  it('Should set default values of all fields', () => {
    cy.get(FIRST_NAME_FIELD).should('have.value', 'John')
    cy.get(LAST_NAME_FIELD).should('have.value', 'Doe')
    cy.get(COUNTRY_SELECT).should('have.value', 'United States')
    cy.get(ZIP_CODE_FIELD).should('have.value', '51378')
  })
}

const testShowingRequiredErrorMessages = () => {
  it('Show an error message for an empty text field that is required', () => {
    // Negative check
    cy.get(FIRST_NAME_ERROR).should('not.exist')

    cy.get(FIRST_NAME_FIELD)
      .clear()
      .blur()
      .should('exist')
  })
}

const displayZipError = () => {
  cy.get(ZIP_CODE_FIELD)
    .clear()
    .type('1234')
    .blur()

  // Make error message visible
  cy
    .get(ZIP_CODE_ERROR)
    .should('exist')
}

const testDisplayingFaultyZipError = () => {
  it('Should show an error message for a zip code field with a faulty format', () => {
    //Negative check
    cy.get(ZIP_CODE_ERROR).should('not.exist')

    displayZipError()
  })
}

const testZipErrorHide = () => {
  it('Should make a zip error go away, when correcting the zip code', () => {
    displayZipError()

    // Type in valid zip code, to make error message disappear
    cy
      .get(ZIP_CODE_FIELD)
      .clear()
      .type('51378')
      .blur()

    cy
      .get(ZIP_CODE_ERROR)
      .should('not.exist')
  })
}

const testValidZipIfNoCountryPattern = () => {
  it('Should simply validate zip as true, if country has no pattern', () => {
    cy
      .get(COUNTRY_SELECT)
      .click()
      .get('#phlib__select-option-country-5')
      .click()

    cy.get(ZIP_CODE_FIELD)
      .type('12XXX!!?')
      .blur()
      .get(ZIP_CODE_ERROR)
      .should('not.exist')
  })
}

const testFieldRowOption = () => {
  it('Should display multiple fields in a row', () => {
    cy
      .get('.phlib__multiple-fields-row')
      // assert that there is only one row
      .should('have.length', 1)
      // assert that there are 3 fields in the row
      .find('.' + FIELD_WRAPPER_CLASS)
      .should('have.length', 3)
  })
}

const testSelectValueRadioGroup = () => {
  it('Should select a new value in the radio button group', () => {
    // 1. Select Packstation, and check that the value is set
    cy
      .get('[data-cy="phlib__radio-button--packstation"]')
      .click()
    cy
      .get('#phlib__radio-button--packstation')
      .should('be.checked')

    // 2. Negative checks
    cy
      .get('#phlib__radio-button--shipping')
      .should('not.be.checked')

    cy
      .get('#phlib__radio-button--billing')
      .should('not.be.checked')

    // 3. Select Shipping, and check that the value is set
    cy
      .get('[data-cy="phlib__radio-button--shipping"]')
      .click()

    cy
      .get('#phlib__radio-button--shipping')
      .should('be.checked')
  })
}

const testFocusingFieldOnRender = () => {
  it('Should focus the yyyy field upon rendering the page', () => {
    cy
      .focused()
      .should('have.attr', 'id', 'phormal-field-input-firstName')
  })
}

const testCapitalizingOneWordInput = () => {
  it('Should capitalize a one-word input with useAutoCapitalize', () => {
    cy
      .get('#phormal-field-input-firstName')
      .clear()
      .type('john')
      .should('have.value', 'John')
  });
}

const testCapitalizingMultipleWordInput = () => {
  it('Should capitalize a multiple-word input with useAutoCapitalize', () => {
    cy
      .get('#phormal-field-input-firstName')
      .clear()
      .type('john henry doe')
      .should('have.value', 'John Henry Doe')
  })
}

const runAllTests = () => {
  testRenderingAllFields()
  testSettingDefaultValues()
  testShowingRequiredErrorMessages()
  testDisplayingFaultyZipError()
  testZipErrorHide()
  testValidZipIfNoCountryPattern()
  testFieldRowOption()
  testSelectValueRadioGroup()
  testFocusingFieldOnRender()
  testCapitalizingOneWordInput()
  testCapitalizingMultipleWordInput()
}

const runBasicThemeSpecificTests = () => {
  it('Should render a placeholder', () => {
    cy
      .get('#phormal-field-input-yyyy')
      .should('have.attr', 'placeholder', 'Enter birth year')
  })

  it('Should not render a placeholder', () => {
    cy
      .get('#phormal-field-input-firstName')
      .should('not.have.attr', 'placeholder')
  })
}

const runMaterialThemeSpecificTests = () => {
  it('Should render a placeholder with a default &npsb; value', () => {
    cy
      .get('#phormal-field-input-yyyy')
      .should('have.attr', 'placeholder', '&nbsp;')
  })
}

describe('Smoke with theme basic', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/smoke')
  })

  runAllTests()
  runBasicThemeSpecificTests()
})

describe('Smoke with theme material', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/smoke?theme=material')
  })

  runMaterialThemeSpecificTests()
  runAllTests()
})

describe('[mobile] Smoke with theme basic', () => {
  beforeEach(() => {
    cy.viewport(320, 750)
    cy.visit('/#/e2e/smoke')
  })

  runAllTests()
  runBasicThemeSpecificTests()
})

describe('[mobile] Smoke with theme material', () => {
  beforeEach(() => {
    cy.viewport(320, 750)
    cy.visit('/#/e2e/smoke?theme=material')
  })

  runAllTests()
  runMaterialThemeSpecificTests()
})

export {}
