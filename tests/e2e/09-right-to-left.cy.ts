describe('A form with dir="rtl"', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/right-to-left')
  })

  it('Render a placeholder', () => {
    cy
      .get('#phormal-field-input-firstName')
      .should('have.attr', 'placeholder', 'نام کوچک خود را وارد کنید')
  })

  it('Selects different values with the multiselect', () => {
    cy
      .get('#phormal-field-input-country')
      .should('have.value', '')

    cy
      .get('#phormal-field-input-country')
      .click()

    cy
      .get('#phlib__select-option-country-2')
      .click()

    cy
      .get('#phormal-field-input-country')
      .should('have.value', 'مکزیک')
  })

  it('Selects different values with the radiogroup', () => {
    cy
      .get('[data-cy="phlib__radio-button--cc"]')
      .click()

    cy
      .get('#getvalues')
      .click()

    cy
      .get('#code-element')
      .should('contain', '"paymentMethod": "cc"')

    cy
      .get('[data-cy="phlib__radio-button--pp"]')
      .click()

    cy
      .get('#getvalues')
      .click()

    cy
      .get('#code-element')
      .should('contain', '"paymentMethod": "pp"')
  })
})
