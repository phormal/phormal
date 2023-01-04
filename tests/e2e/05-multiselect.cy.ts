describe('The multiselect field', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/multiselect')
  })
  
  it('Renders a multiselect field with a label', () => {
    cy
      .get('#phlib__select-label-bar')
      .should('exist')
      .should('contain.text', 'Bar')
  })

  it('Renders a multiselect without a label', () => {
    cy
      .get('#phlib__select-label-baz')
      .should('not.exist')
  })

  it('Renders a multiselect with a default value', () => {
    cy
      .get('#phormal-field-input-bar')
      .should('have.value', 'Bar')
  })

  it('Renders a multiselect without a default value, when the value does not match an option', () => {
    cy
      .get('#phormal-field-input-baz')
      .should('have.value', '')
  })

  it('Focuses the first option upon opening the options list', () => {
    cy
      .get('#phormal-field-input-bar')
      .click()

    const focusedOption = cy.focused()
    focusedOption.should('have.attr', 'id', 'phlib__select-option-bar-0')
  })

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
      .should('contain.text', '"bar":"baz"')
  })

  it('Disables a select field', () => {
    cy
      .get('#phormal-field-input-qux')
      .should('be.disabled')
  })

  // TODO: tests getting the correct values, upon calling $values()

  // TODO: test opening the options with space key

  // TODO: test opening the options with enter key
})