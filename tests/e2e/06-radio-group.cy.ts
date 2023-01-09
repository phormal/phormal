const testDisablingOption = () => {
  it('Should render disabled options', () => {
    cy
      .get('#phlib__radio-button--baz')
      .should('be.disabled')
  })
}

const testRenderingOptionNotDisabled = () => {
  it('Should render options that are not disabled', () => {
    cy
      .get('#phlib__radio-button--foo')
      .should('not.be.disabled')

    cy
      .get('#phlib__radio-button--bar')
      .should('not.be.disabled')
  })
}

const testRenderingWithCorrectDefaultValue = () => {
  it('Should render with the correct default value', () => {
    cy
      .get('#phlib__radio-button--foo')
      .should('be.checked')

    // Negative checks
    cy
      .get('#phlib__radio-button--bar')
      .should('not.be.checked')

    cy
      .get('#phlib__radio-button--baz')
      .should('not.be.checked')
  })
}

const testRenderingRadioGroupWithLabel = () => {
  it('Should render with a label', () => {
    cy
      .get('.phlib__radio-group-label')
      .should('be.visible')
      .should('have.text', 'Foo')
  })
}

const testRenderingRadioGroupWithoutLabel = () => {
  it('Should render without a label', () => {
    cy.get('.phlib__radio-group').then($radioGroups => {
      $radioGroups.each((index, radioGroup) => {
        if (index === 1) {
          cy
            .wrap(radioGroup)
            .find('.phlib__radio-group-label')
            .should('not.be.exist')
        }
      })
    })
  })
}

const runAllRadioButtonTests = () => {
  testDisablingOption()
  testRenderingOptionNotDisabled()
  testRenderingWithCorrectDefaultValue()
  testRenderingRadioGroupWithLabel()
  testRenderingRadioGroupWithoutLabel()
}

describe('RadioGroup', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/radiogroup')
  })

  runAllRadioButtonTests()
})