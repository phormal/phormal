describe('React integration', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/react')
  })

  it('Renders all expected fields', () => {
    cy.get('#phormal-field-input-name').should('exist')
    cy.get('#phormal-field-input-country').should('exist')
    cy.get('#phormal-field-input-agree').should('exist')
  })

  it('Interacts with text input and changes its value', () => {
    cy.get('#phormal-field-input-name').type('John Doe')
    cy.get('#get-values').click()
    cy.get('#values').should('contain', '"name": "John Doe",')
  })

  it('Interacts with select and changes its value', () => {
    cy.get('#phormal-field-input-country').click()
    cy.get('#phlib__select-option-country-1').click()
    cy.get('#get-values').click()
    cy.get('#values').should('contain', '"country": "ca",')
  })

  it('Interacts with checkbox and changes its value', () => {
    cy.get('#phormal-field-input-agree').click()
    cy.get('#get-values').click()
    cy.get('#values').should('contain', '"agree": true')
  })
})
