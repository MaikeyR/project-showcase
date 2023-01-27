describe('Article', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1313/oojankoudijs2022/')
  })

  it('clicks on button and checks if it navigates to the Homepage', () => {
    cy.get('.Menu_Button').first().click({force: true});
    cy.url().should('eq', 'http://localhost:1313/');
  })
})