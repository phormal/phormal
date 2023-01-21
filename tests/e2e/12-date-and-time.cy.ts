describe('Date and Time', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/date-and-time')
  })

  it('Displays a date field with min and max values', () => {
    cy
      .get('#phormal-field-input-date')
      .should('have.attr', 'min', '2023-01-01')
      .should('have.attr', 'max', '2023-12-31')
  })

  it('Displays a datetime field with min and max values', () => {
    cy
      .get('#phormal-field-input-datetimeLocal')
      .should('have.attr', 'min', '2023-01-01T00:00')
      .should('have.attr', 'max', '2023-03-20T00:00')
  })

  it('Displays a time field with min and max values', () => {
    cy
      .get('#phormal-field-input-time')
      .should('have.attr', 'min', '01:00')
      .should('have.attr', 'max', '23:00')
  })
})
