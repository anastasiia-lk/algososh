describe('Тестирование_работы_страницы_"последовательность_Фибоначчи"', () => {
  before(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('если_в_инпуте_пусто_то_кнопка_недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').last().as('calculateBtn');
    cy.get('@calculateBtn').should('be.disabled');
    cy.get('input').type('7').should('have.value', '7');
    cy.get('@calculateBtn').should('be.enabled');
    cy.get('input').type('{backspace}').should('have.value', '');
    cy.get('@calculateBtn').should('be.disabled');
  });

  it('числа_генерируются_корректно', () => {
    cy.clock();
    cy.get('input').type('3');
    cy.get('button').last().click();
    cy.tick(500);
    cy.get('li')
      .should('have.length', '1')
      .each(($el, idx) => {
        if (idx === 0)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '0');
            cy.get('p[class*=circle_index]').should('have.text', '0');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '2')
      .each(($el, idx) => {
        if (idx === 1)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '1');
            cy.get('p[class*=circle_index]').should('have.text', '1');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '3')
      .each(($el, idx) => {
        if (idx === 2)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '1');
            cy.get('p[class*=circle_index]').should('have.text', '2');
          });
      });

    cy.tick(500);

    cy.get('li')
      .should('have.length', '4')
      .each(($el, idx) => {
        if (idx === 3)
          cy.wrap($el).within(() => {
            cy.get('p[class*=circle_letter]').should('have.text', '2');
            cy.get('p[class*=circle_index]').should('have.text', '3');
          });
      });
  })
});