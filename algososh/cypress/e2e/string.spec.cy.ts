describe('Страница "Строка"', () => {
  before(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('если_в_инпуте_пусто_то_кнопка_добавления_недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').last().as('reverseBtn');
    cy.get('@reverseBtn').should('be.disabled');
    cy.get('input').type('whatever');
    cy.get('input').should('have.value', 'whatever');
    cy.get('@reverseBtn').should('be.enabled');
    cy.get('input').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
    cy.get('input').should('have.value', '');
    cy.get('@reverseBtn').should('be.disabled');
  });

  // it('анимация разворота работает корректно', () => {
  //   cy.clock();
  //   cy.get('input').type('word');
  //   cy.get('button').last().as('reverseBtn').click();
  //   cy.get('[class^=circle_circle]').each(($el, idx) => {
  //     cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //     if (idx === 0) cy.wrap($el).contains('w');
  //     if (idx === 1) cy.wrap($el).contains('o');
  //     if (idx === 2) cy.wrap($el).contains('r');
  //     if (idx === 3) cy.wrap($el).contains('d');
  //   });

  //   cy.tick(1000);

  //   cy.get('[class^=circle_circle]').each(($el, idx) => {
  //     if (idx === 0 || idx === 3) {
  //       cy.wrap($el).should(
  //         'have.css',
  //         'border',
  //         '4px solid rgb(210, 82, 225)'
  //       );
  //       if (idx === 0) cy.wrap($el).contains('w');
  //       if (idx === 3) cy.wrap($el).contains('d');
  //     }
  //     if (idx === 1 || idx === 2) {
  //       cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       if (idx === 1) cy.wrap($el).contains('o');
  //       if (idx === 2) cy.wrap($el).contains('r');
  //     }
  //   });

  //   cy.tick(1000);

  //   cy.get('[class^=circle_circle]').each(($el, idx) => {
  //     if (idx === 0 || idx === 3) {
  //       cy.wrap($el).should(
  //         'have.css',
  //         'border',
  //         '4px solid rgb(127, 224, 81)'
  //       );
  //       if (idx === 0) cy.wrap($el).contains('d');
  //       if (idx === 3) cy.wrap($el).contains('w');
  //     }
  //     if (idx === 1 || idx === 2) {
  //       cy.wrap($el).should(
  //         'have.css',
  //         'border',
  //         '4px solid rgb(210, 82, 225)'
  //       );
  //       if (idx === 1) cy.wrap($el).contains('o');
  //       if (idx === 2) cy.wrap($el).contains('r');
  //     }
  //   });

  //   cy.tick(1000);

  //   cy.get('[class^=circle_circle]').each(($el, idx) => {
  //     if (idx === 0 || idx === 3) {
  //       cy.wrap($el).should(
  //         'have.css',
  //         'border',
  //         '4px solid rgb(127, 224, 81)'
  //       );
  //       if (idx === 0) cy.wrap($el).contains('d');
  //       if (idx === 3) cy.wrap($el).contains('w');
  //     }
  //     if (idx === 1 || idx === 2) {
  //       cy.wrap($el).should(
  //         'have.css',
  //         'border',
  //         '4px solid rgb(127, 224, 81)'
  //       );
  //       if (idx === 1) cy.wrap($el).contains('r');
  //       if (idx === 2) cy.wrap($el).contains('o');
  //     }
  //   });
  // });
});