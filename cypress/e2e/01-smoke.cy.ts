describe('Smoke', () => {

  beforeEach(() => {
    cy.visit('/#/e2e/smoke')
  })

  const FIRST_NAME_FIELD = 'input[id="super-form-field-input-firstName"]'
  const LAST_NAME_FIELD = 'input[id="super-form-field-input-lastName"]'
  const COUNTRY_SELECT = 'select[id="super-form-field-input-country"]'
  const ZIP_CODE_FIELD = 'input[id="super-form-field-input-zip"]'
  const FIRST_NAME_ERROR = 'div[id="super-form-field-error-firstName"]'
  const ZIP_CODE_ERROR = 'div[id="super-form-field-error-zip"]'

  it('should render all expected fields', () => {
    cy.get(FIRST_NAME_FIELD).should('exist')
    cy.get(LAST_NAME_FIELD).should('exist')
    cy.get(COUNTRY_SELECT).should('exist')
  })

  it('Should set default values of all fields', () => {
    cy.get(FIRST_NAME_FIELD).should('have.value', 'John')
    cy.get(LAST_NAME_FIELD).should('have.value', 'Doe')
    cy.get(COUNTRY_SELECT).should('have.value', 'US')
    cy.get(ZIP_CODE_FIELD).should('have.value', '51378')
  })

  it('Show an error message for an empty text field that is required', () => {
    // Negative check
    cy.get(FIRST_NAME_ERROR).should('not.exist')

    cy.get(FIRST_NAME_FIELD)
      .clear()
      .blur()
      .should('exist')
  })

  it('Should show an error message for a zip code field with a faulty format', () => {
    //Negative check
    cy.get(ZIP_CODE_ERROR).should('not.exist')

    cy.get(ZIP_CODE_FIELD)
      .clear()
      .type('1234')
      .blur()
      .should('exist')
  })
})