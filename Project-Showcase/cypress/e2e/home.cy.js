describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1313/')
  })
      
  it('Direct naar:', () => {
    cy.get(":nth-child(1)")
        .should("exist")
        .contains("Direct naar:")
  })

  it('clicks button and checks for correct URL', () => {
    cy.get('#bouncing-arrow').click()
    cy.url().should('include', '/#Artikelen')
  });

  
  
  /* Searchbar Tests */
  it('types in search bar and checks for no results', () => {
    cy.get('#bouncing-arrow').click()
    cy.get('input[name="search"]').type('non-existent search query eirhsier')
    cy.get('.tekstgeenzoekr').should('be.visible')
  });
  it('types in search bar and checks for no articles', () => {
    cy.get('#bouncing-arrow').click()
    cy.get('input[name="search"]').type('non-existent search query eirhsier')
    cy.get('.tr').should('not.exist')
  });
  it('types in search and checks for results', () => {
    cy.get('input[name="search"]').type('de')
    cy.get('.tekstgeenzoekr').should('not.exist')
  });
  it('types in search bar and checks for results FDD article', () => {
    cy.get('#bouncing-arrow').click()
    cy.get('input[name="search"]').type('FDD')
    cy.get('tr').should('be.visible')
  });


  /* Tags Tests */
  it('clicks on tag and checks if the tag is visible', () => {
    cy.get('label').first().click();
    cy.get('.ptag').should('be.visible');
  });
  it('click 2 times on tag and checks if the tag is not visible', () => {
    cy.get('label').first().click().click();
    cy.get('.ptag').should('not.be.visible');
  });
  it('clicks on tag and checks if the tag works', () => {
    cy.get('label').first().click();
    cy.get('.ptag > :nth-child(2)').click();
    cy.get('.project').should('contain', 'PM Profity 2022');
    cy.get('[href="./fddjankoudijs/"]').should('not.be.visible');
  });

  /* Articles Tests */ 
  it('clicks on article link and checks if it navigates to the article', () => {
    cy.get('[href="./oojankoudijs2022/"]').first().click({force: true});
    cy.get('h1').contains('Object Oriented Development Jan Koudijs')
  });
  
})