describe('The Vue 3 integration', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/component-vue3')
  })

  it('Should render a Vue 3 component', () => {
    cy.get('#phlib__phormal-wrapper').should('exist')
  })

  it('Should interact interact with a text field', () => {
    cy.get('#phormal-field-input-field1').should('have.value', 'John')
    cy.get('#phormal-field-input-field1').type('test')
    cy.get('#phormal-field-input-field1').should('have.value', 'Johntest')

    cy.get('#getvalues').click()
    cy.get('#values').should('contain.text', '"field1": "Johntest",')
  })

  it('Should interact with a checkbox', () => {
    cy.get('#getvalues').click()
    cy.get('#values').should('contain.text', '"field2": false,')
    cy.get('#phormal-field-input-field2').click()
    cy.get('#getvalues').click()
    cy.get('#values').should('contain.text', '"field2": true,')
  })

  it('Should interact with a select', () => {
    cy.get('#getvalues').click()
    cy.get('#values').should('contain.text', '"field3": ""')
    cy.get('#phormal-field-input-field3').click()
    cy.get('#phlib__select-option-field3-1').click()
    cy.get('#getvalues').click()
    cy.get('#values').should('contain.text', '"field3": "2"')
  })
  
  it('Should use $validate function, and display an error message', () => {
    cy.get('#validate-button').click()
    cy.get('#phormal-field-error-field1').should('not.exist')
    cy.get('#phormal-field-input-field1').clear()
    cy.get('#validate-button').click()
    cy.get('#phormal-field-error-field1').should('exist')
  })
})

export {}