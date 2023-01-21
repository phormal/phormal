describe('Destroy instance', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/destroy-instance');
  })

  it('Should destroy the instance', () => {
    const formCheckbox = '#phormal-field-input-foo';

    cy
      .get(formCheckbox)
      .should('exist')

    cy
      .get('#destroy')
      .click()

    cy
      .get(formCheckbox)
      .should('not.exist')
  })
})

export {}
