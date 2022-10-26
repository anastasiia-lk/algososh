describe('Тестирование_работы_страницы_"очередь"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('если_в_инпуте_пусто_то_кнопка_недоступна', () => {
    cy.get('input').should('have.text', '');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .as('addBtn')
    cy.get('input').type('777');
    cy.get('@addBtn').should('be.enabled');
    cy.get('input').type('{backspace}{backspace}{backspace}');
    cy.get('@addBtn').should('be.disabled');
  });

  it('правильность_добавления_элемента_в_очередь', () => {
    cy.clock();
    cy.get('li')
      .as('elements')
      .should('have.length', '7')
      .each(($el, idx) => {
        cy.wrap($el).within(() => {
          cy.get('[class*=circle_letter]').should('not.have.text');
          cy.get('[class*=circle_head]').should('not.have.text');
          cy.get('[class*=circle_index]').should('have.text', `${idx}`);
          cy.get('[class*=circle_tail]').should('not.have.text');
        });
      });

    cy.get('input').type('1');
    cy.get('button').contains('Добавить').parent().as('addBtn').click();

    cy.get('@elements').each(($el, idx) => {
      if (idx === 0) {
        cy.wrap($el).within(() => {
          cy.get('[class*=circle_letter]').should('have.text', '1');
          cy.get('[class*=circle_head]').should('have.text', 'head');
          cy.get('[class*=circle_tail]').should('have.text', 'tail');
          cy.get('[class*=circle_circle]').should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
        });
        cy.tick(500);

        cy.wrap($el).within(() => {
          cy.get('[class*=circle_circle]').should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)'
          );
        });
      }
    });
  });

  it('правильность_удаления_элемента_из_очереди', () => {
    cy.clock();
    cy.get('button')
      .contains('Удалить')
      .parent()
      .as('deleteBtn')
    cy.get('input').type('1');
    cy.get('button').contains('Добавить').parent().as('addBtn').click();
    cy.tick(500);
    cy.get('@deleteBtn').click();
    cy.get('li')
      .as('list')
      .first()
      .as('head')
      .within(() => {
        cy.get('[class*=circle_letter]').should('have.text', '1');
        cy.get('[class*=circle_head]').should('have.text', 'head');
        cy.get('[class*=circle_circle]').should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)'
        );
      })
      .next()
      .as('next')
      .within(() => {
        cy.get('[class*=circle_head]').should('not.have.text');
      });
    cy.tick(500);

    cy.get('@head').within(() => {
      cy.get('[class*=circle_head]').should('not.have.text');
      cy.get('[class*=circle_letter]').should('not.have.text');
      cy.get('[class*=circle_circle]').should(
        'have.css',
        'border',
        '4px solid rgb(0, 50, 255)'
      );
    });

    cy.get('@next').within(() => {
      cy.get('[class*=circle_head]').should('have.text', '');
    });
  });

  it('проверка_поведения_кнопки_"очистить"', () => {
    cy.clock();
    cy.get('button')
      .contains('Очистить')
      .parent()
      .as('clBtn')
    cy.get('input').type('7');
    cy.get('button').contains('Добавить').parent().as('addBtn').click();
    cy.tick(500);
    cy.get('input').type('37');
    cy.get('@addBtn').click();
    cy.tick(500);

    cy.get('@clBtn').click();
    cy.get('li').each(($el, idx) => {
      cy.wrap($el).within(() => {
        cy.get('[class*=circle_head]').should('not.have.text');
        cy.get('[class*=circle_letter]').should('not.have.text');
        cy.get('[class*=circle_tail]').should('not.have.text');
        cy.get('[class*=circle_index]').should('have.text', `${idx}`);
      });
    });
  });
});