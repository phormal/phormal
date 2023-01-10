const runAllEventHandlerTests = () => {

  it('Should trigger a custom change handler on changing a field', () => {
    cy
      .get('#page-wrapper')
      .contains('Changed: 0')

    cy
      .get('#phormal-field-input-foo')
      .type('bar')
      .blur()

    cy
      .get('#page-wrapper')
      .contains('Changed: 1')
  })

  it('Should trigger a custom input handler on typing into a field', () => {
    cy
      .get('#page-wrapper')
      .contains('Input: 0')

    cy
      .get('#phormal-field-input-foo')
      .type('bar')

    cy
      .get('#page-wrapper')
      .contains('Input: 3')
  })

  it('Should trigger a custom input handler defined in a hook', () => {
    cy
      .get('#page-wrapper')
      .contains('Input: 0')

    cy
      .get('#phormal-field-input-bar')
      .type('baz')

    cy
      .get('#page-wrapper')
      .contains('Input: 3')
  })

  it('Should trigger a custom blur handler defined in a hook', () => {
    cy
      .get('#page-wrapper')
      .contains('Blurred: 0')

    cy
      .get('#phormal-field-input-bar')
      .click()
      .blur()

    cy
      .get('#page-wrapper')
      .contains('Blurred: 1')
  })

  it('Should trigger a custom click handler on clicking a field', () => {
    cy
      .get('#page-wrapper')
      .contains('Clicked: 0')

    cy
      .get('#phormal-field-input-foo')
      .click()

    cy
      .get('#page-wrapper')
      .contains('Clicked: 1')
  })

  it('Should trigger a custom blur handler on blurring a field', () => {
    cy
      .get('#page-wrapper')
      .contains('Blurred: 0')

    cy
      .get('#phormal-field-input-foo')
      .click()
      .blur()

    cy
      .get('#page-wrapper')
      .contains('Blurred: 1')
  })

  it('Should trigger a custom focus handler on focusing a field', () => {
    cy
      .get('#page-wrapper')
      .contains('Focused: 0')

    cy
      .get('#phormal-field-input-foo')
      .click()

    cy
      .get('#page-wrapper')
      .contains('Focused: 1')
  })

  it('Should trigger a custom change handler defined in a hook', () => {
    cy
      .get('#page-wrapper')
      .contains('Changed: 0')

    cy
      .get('#phormal-field-input-bar')
      .type('baz')
      .blur()

    cy
      .get('#page-wrapper')
      .contains('Changed: 1')
  })

  it('Should trigger a custom focus handler defined in a hook', () => {
    cy
      .get('#page-wrapper')
      .contains('Focused: 0')

    cy
      .get('#phormal-field-input-bar')
      .click()

    cy
      .get('#page-wrapper')
      .contains('Focused: 1')
  })

  it('Should trigger a custom click handler defined in a hook', () => {
    cy
      .get('#page-wrapper')
      .contains('Clicked: 0')

    cy
      .get('#phormal-field-input-bar')
      .click()
      .click()
      .click()
      .click()
      .click()

    cy
      .get('#page-wrapper')
      .contains('Clicked: 5')
  })
}

describe('Event handlers with theme "basic"', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/event-handlers')
  })

  runAllEventHandlerTests()
})

describe('Event handlers with theme "material"', () => {
  beforeEach(() => {
    cy.visit('/#/e2e/event-handlers?theme=material')
  })

  runAllEventHandlerTests()
})