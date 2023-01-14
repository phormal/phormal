class CheckboxTests {
  static testRenderingDefaultTrue() {
    it('Renders with a default value of "true"', () => {
      cy
        .get('#phormal-field-input-foo')
        .should('be.checked')
    })
  }

  static testRenderingDefaultFalse() {
    it('Renders with a default value of "false"', () => {
      cy
        .get('#phormal-field-input-bar')
        .should('not.be.checked')
    })
  }

  static testRenderingDisabled() {
    it('Is disabled on being rendered', () => {
      cy
        .get('#phormal-field-input-baz')
        .should('be.disabled')
    })
  }

  static testCheckingByClicking() {
    it('Can be checked by clicking', () => {
      cy
        .get('#phormal-field-input-bar')
        .click()
        .should('be.checked')
    })
  }

  static testUncheckingByClicking() {
    it('Can be unchecked by clicking', () => {
      cy
        .get('#phormal-field-input-foo')
        .click()
        .should('not.be.checked')
    })
  }

  static testCheckingByClickingLabel() {
    it('Can be checked by clicking on the label', () => {
      cy
        .get('label[for="phormal-field-input-bar"]')
        .click()

      cy
        .get('#phormal-field-input-bar')
        .should('be.checked')
    })
  }

  static testUncheckingByClickingLabel() {
    it('Can be unchecked by clicking on the label', () => {
      cy
        .get('label[for="phormal-field-input-foo"]')
        .click()

      cy
        .get('#phormal-field-input-foo')
        .should('not.be.checked')
    })
  }

  static testCheckingByPressingSpace() {
    it('Can be checked by being focused and pressing space key', () => {
      cy
        .get('#phormal-field-input-bar')
        .focus()
        .type(' ')

      cy
        .get('#phormal-field-input-bar')
        .should('be.checked')
    })
  }

  static testUncheckingByPressingSpace() {
    it('Can be unchecked by being focused and pressing space key', () => {
      cy
        .get('#phormal-field-input-foo')
        .focus()
        .type(' ')

      cy
        .get('#phormal-field-input-foo')
        .should('not.be.checked')
    })
  }
}

describe('Checkbox with theme "basic"', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/checkbox')
  })

  CheckboxTests.testRenderingDefaultTrue()
  CheckboxTests.testRenderingDefaultFalse()
  CheckboxTests.testRenderingDisabled()
  CheckboxTests.testCheckingByClicking()
  CheckboxTests.testUncheckingByClicking()
  CheckboxTests.testCheckingByClickingLabel()
  CheckboxTests.testUncheckingByClickingLabel()
  CheckboxTests.testCheckingByPressingSpace()
  CheckboxTests.testUncheckingByPressingSpace()
})

describe('Checkbox with theme "material"', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/checkbox?theme=material')
  })

  // Label covers the checkbox in material, so we can't click on it directly. Therefore, this has to be tested manually.

  CheckboxTests.testRenderingDefaultTrue()
  CheckboxTests.testRenderingDefaultFalse()
  CheckboxTests.testRenderingDisabled()
  CheckboxTests.testCheckingByClickingLabel()
  CheckboxTests.testUncheckingByClickingLabel()
  CheckboxTests.testCheckingByPressingSpace()
  CheckboxTests.testUncheckingByPressingSpace()
})
