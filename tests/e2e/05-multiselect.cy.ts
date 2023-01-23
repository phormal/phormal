const testRenderingWithLabel = () => {
  it('Renders a multiselect field with a label', () => {
    cy
      .get('#phlib__select-label-bar')
      .should('exist')
      .should('contain.text', 'Bar')
  })
}

const testRenderingWithoutLabel = () => {
  it('Renders a multiselect without a label', () => {
    cy
      .get('#phlib__select-label-baz')
      .should('not.exist')
  })
}

const testRenderingWithDefaultValue = () => {
  it('Renders a multiselect with a default value', () => {
    cy
      .get('#phormal-field-input-bar')
      .should('have.value', 'Bar')
  })
}

const testDefaultValueThatDoesNotMatchAnyOption = () => {
  it('Renders a multiselect with a default value, when the value does not match an option', () => {
    cy
      .get('#phormal-field-input-baz')
      .should('have.value', '')
  })
}

const testFocusingFirstOption = () => {
  it('Focuses the first option upon opening the options list', () => {
    cy
      .get('#phormal-field-input-bar')
      .click()

    const focusedOption = cy.focused()
    focusedOption.should('have.attr', 'id', 'phlib__select-option-bar-0')
  })
}

const testNavigatingOptionsWithArrowKeys = () => {
  it('Navigates the options list with the arrow keys', () => {
    cy
      .get('#phormal-field-input-bar')
      .click()

    cy.focused().type('{downarrow}')
    cy.focused().should('have.attr', 'id', 'phlib__select-option-bar-1')
    cy.focused().type('{downarrow}')
    cy.focused().should('have.attr', 'id', 'phlib__select-option-bar-2')
    cy.focused().type('{uparrow}')
    cy.focused().should('have.attr', 'id', 'phlib__select-option-bar-1')
    cy.focused().type('{uparrow}')
    cy.focused().should('have.attr', 'id', 'phlib__select-option-bar-0')
    // Now try using uparrow even though we're at the top of the list
    cy.focused().type('{uparrow}')
    cy.focused().should('have.attr', 'id', 'phlib__select-option-bar-0')
  })
}

const testSelectingOptionWithEnterKey = () => {
  it('Selects an option using the {enter} key', () => {
    cy
      .get('#phormal-field-input-bar')
      .should('have.value', 'Bar')

    cy
      .get('#phormal-field-input-bar')
      .click()

    cy.focused().type('{downarrow}')
    cy.focused().type('{enter}')
    cy.get('#phormal-field-input-bar').should('have.value', 'Baz')
  });
}

const testSelectingOptionByClicking = () => {
  it('Selects an option by clicking it', () => {
    cy
      .get('#phormal-field-input-bar')
      .should('have.value', 'Bar')
      .click()

    cy
      .get('#phlib__select-option-bar-1')
      .click()

    // 1. Test that the label of the selected value is correct
    cy
      .get('#phormal-field-input-bar')
      .should('have.value', 'Baz')

    // 2. Test that the value itself is correct
    cy.get('#getvalues').click()
    cy
      .get('#code')
      .should('contain.text', '"bar": "baz",')
  })
}

const testDisablingField = () => {
  it('Disables a select field', () => {
    cy
      .get('#phormal-field-input-qux')
      .should('be.disabled')
  })
}

const testHidingOptionsOnEscapeKey = () => {
  it('Hides the options list when pressing the escape key', () => {
    cy
      .get('#phormal-field-input-bar')
      .click()

    // Test that the options are displayed
    cy
      .get('#phlib__select-options-bar')
      .should('be.visible')

    cy.focused().type('{esc}')
    cy.get('#phlib__select-options-bar').should('not.be.visible')
  })
}

const testHidingOptionsOnClickOutside = () => {
  it('Hides the options list when clicking outside of the field', () => {
    cy
      .get('#phormal-field-input-bar')
      .click()

    // Test that the options are displayed
    cy
      .get('#phlib__select-options-bar')
      .should('be.visible')

    cy.get('#getvalues').click().wait(100)
    cy.get('#phlib__select-options-bar').should('not.be.visible')
  })
}

const runAllTests = () => {
  testRenderingWithLabel()
  testRenderingWithoutLabel()
  testRenderingWithDefaultValue()
  testDefaultValueThatDoesNotMatchAnyOption()
  testFocusingFirstOption()
  testNavigatingOptionsWithArrowKeys()
  testSelectingOptionWithEnterKey()
  testSelectingOptionByClicking()
  testDisablingField()
  testHidingOptionsOnEscapeKey()
  testHidingOptionsOnClickOutside()

  // TODO: tests getting the correct values, upon calling $values()
  // TODO: test opening the options with space key
  // TODO: test opening the options with enter key
}

describe('The multiselect field with theme basic', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/multiselect')
  })

  runAllTests()
})

describe('The multiselect field with theme material', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/multiselect?theme=material')
  })

  runAllTests()
})

describe('[mobile] The multiselect field with theme basic', () => {
  beforeEach(() => {
    cy.viewport(320, 750)
    cy.visit('/#/e2e/multiselect')
  })

  runAllTests()
})

describe('[mobile] The multiselect field with theme material', () => {
  beforeEach(() => {
    cy.viewport(320, 750)
    cy.visit('/#/e2e/multiselect?theme=material')
  })

  runAllTests()
})
