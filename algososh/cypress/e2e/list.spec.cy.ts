describe('Тестирование_работы_страницы_"список"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  describe('если_в_инпуте_пусто_то_кнопки_недоступны', () => {
    it('"добавить_в_head"_и_"добавить_в_tail"', () => {
      cy.get('input[placeholder="Введите значение"]')
        .as('valueInput')
        .should('have.value', '');
      cy.get('button')
        .contains('Добавить в head')
        .parent()
        .as('addHeadBtn')
        .should('be.disabled');
      cy.get('button')
        .contains('Добавить в tail')
        .parent()
        .as('addTailBtn')
        .should('be.disabled');
      cy.get('@valueInput').type('77');
      cy.get('@addHeadBtn').should('be.enabled');
      cy.get('@addTailBtn').should('be.enabled');
      cy.get('@valueInput').type('{backspace}{backspace}');
      cy.get('@addHeadBtn').should('be.disabled');
      cy.get('@addTailBtn').should('be.disabled');
    });

    it('"добавить_по_индексу"_и_"удалить_по_индексу"', () => {
      cy.get('input[placeholder="Введите значение"]')
        .as('valueInput')
        .should('have.value', '');
      cy.get('input[placeholder="Введите индекс"]')
        .as('indexInput')
        .should('have.value', '');
      cy.get('button')
        .contains('Добавить по индексу')
        .parent()
        .as('addByIndexBtn')
        .should('be.disabled');
      cy.get('button')
        .contains('Удалить по индексу')
        .parent()
        .as('delByIndexBtn')
        .should('be.disabled');
      cy.get('@valueInput').type('7');
      cy.get('@addByIndexBtn').should('be.disabled');
      cy.get('@delByIndexBtn').should('be.disabled');
      cy.get('@indexInput').type('1');
      cy.get('@addByIndexBtn').should('be.enabled');
      cy.get('@delByIndexBtn').should('be.enabled');
      cy.get('@valueInput').type('{backspace}');
      cy.get('@addByIndexBtn').should('be.disabled');
      cy.get('@delByIndexBtn').should('be.enabled');
      cy.get('@indexInput').type('{backspace}');
      cy.get('@delByIndexBtn').should('be.disabled');
    });
  });

  it(
    'проверка_корректности_отрисовки_дефолтного_списка',
    { env: { first: '0', second: '34', third: '8', fourth: '1' } },
    () => {
      cy.get('li')
        .each(($el, idx) => {
          cy.wrap($el).within(() => {
            if (idx === 0) {
              cy.get('[class*=circle_head]').should('have.text', 'head');
              cy.get('[class*=circle_letter]').should(
                'have.text',
                `${Cypress.env('first')}`
              );
              cy.get('[class*=circle_index]').should('have.text', `${idx}`);
              cy.get('[class*=circle_tail]').should('be.empty');
            }
            if (idx === 1) {
              cy.get('[class*=circle_head]').should('be.empty');
              cy.get('[class*=circle_letter]').should(
                'have.text',
                `${Cypress.env('second')}`
              );
              cy.get('[class*=circle_index]').should('have.text', `${idx}`);
              cy.get('[class*=circle_tail]').should('be.empty');
            }
            if (idx === 2) {
              cy.get('[class*=circle_head]').should('be.empty');
              cy.get('[class*=circle_letter]').should(
                'have.text',
                `${Cypress.env('third')}`
              );
              cy.get('[class*=circle_index]').should('have.text', `${idx}`);
              cy.get('[class*=circle_tail]').should('be.empty');
            }
            if (idx === 3) {
              cy.get('[class*=circle_head]').should('be.empty');
              cy.get('[class*=circle_letter]').should(
                'have.text',
                `${Cypress.env('fourth')}`
              );
              cy.get('[class*=circle_index]').should('have.text', `${idx}`);
              cy.get('[class*=circle_tail]').should('have.text', 'tail');
            }
          });
        })
        .should('have.length', '4');
    }
  );

  describe('проверка_корректности_добавления_элементов', () => {
    it(
      'в_head',
      { env: { addItem: '1', listLength: 4 } },
      () => {
        cy.clock();
        cy.get('input[placeholder="Введите значение"]').type(
          Cypress.env('addItem')
        );
        cy.get('button').contains('Добавить в head').parent().click();
        cy.get('li')
          .should('have.length', Cypress.env('listLength'))
          .first()
          .within(() => {
            cy.get('[class*=circle_head]').within(() => {
              cy.get('[class*=circle_content]').within(() => {
                cy.get('[class*=circle_circle]').should('satisfy', ($el) => {
                  const className = $el[0].className;
                  return (
                    /circle_small/.test(className) &&
                    /circle_changing/.test(className)
                  );
                });
                cy.get('[class*=circle_letter]').should(
                  'have.text',
                  Cypress.env('addItem')
                );
              });
            });
          });

        cy.tick(1000);

        cy.get('li')
          .should('have.length', Cypress.env('listLength') + 1)
          .first()
          .as('firstEl')
          .within(() => {
            cy.get('[class*=circle_head]').should('have.text', 'head');
            cy.get('[class*=circle_letter]').should(
              'have.text',
              Cypress.env('addItem')
            );
            cy.get('[class*=circle_circle]').should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            );
          });

        cy.tick(1000);

        cy.get('@firstEl').within(() => {
          cy.get('[class*=circle_circle]').should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)'
          );
        });
      }
    );

    it(
      'в_tail',
      { env: { addItem: '79', listLength: 4 } },
      () => {
        cy.clock();
        cy.get('input[placeholder="Введите значение"]').type(
          Cypress.env('addItem')
        );
        cy.get('button').contains('Добавить в tail').parent().click();
        cy.get('li')
          .should('have.length', Cypress.env('listLength'))
          .last()
          .within(() => {
            cy.get('[class*=circle_head]').within(() => {
              cy.get('[class*=circle_content]').within(() => {
                cy.get('[class*=circle_circle]').should('satisfy', ($el) => {
                  const className = $el[0].className;
                  return (
                    /circle_small/.test(className) &&
                    /circle_changing/.test(className)
                  );
                });
                cy.get('[class*=circle_letter]').should(
                  'have.text',
                  Cypress.env('addItem')
                );
              });
            });
          });

        cy.tick(1000);

        cy.get('li')
          .should('have.length', Cypress.env('listLength') + 1)
          .last()
          .as('lastItem')
          .within(() => {
            cy.get('[class*=circle_tail]').should('have.text', 'tail');
            cy.get('[class*=circle_letter]').should(
              'have.text',
              Cypress.env('addItem')
            );
            cy.get('[class*=circle_circle]').should(
              'have.css',
              'border',
              '4px solid rgb(127, 224, 81)'
            );
          });

        cy.tick(1000);

        cy.get('@lastItem').within(() => {
          cy.get('[class*=circle_circle]').should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)'
          );
        });
      }
    );

  //   it(
  //     'добавление по индексу',
  //     { env: { insertedVal: '1', insertedIdx: '2', initLength: 4 } },
  //     () => {
  //       cy.clock();
  //       cy.get('li')
  //         .as('list')
  //         .should('have.length', Cypress.env('initLength'));
  //       cy.get('input[placeholder="Введите значение"]').type(
  //         Cypress.env('insertedVal')
  //       );
  //       cy.get('input[placeholder="Введите индекс"]').type(
  //         Cypress.env('insertedIdx')
  //       );
  //       cy.get('button').contains('Добавить по индексу').parent().click();
  //       cy.get('@list').then(($list) => {
  //         for (let i = 0; i <= Cypress.env('insertedIdx'); i++) {
  //           cy.wrap($list).each(($el, idx) => {
  //             if (idx < i) {
  //               cy.wrap($el)
  //                 .find('[class*=circle_circle]')
  //                 .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //             }
  //             if (idx === i) {
  //               cy.wrap($el)
  //                 .find('[class*=circle_head]')
  //                 .find('[class*=circle_circle]')
  //                 .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //             }
  //             if (idx > i) {
  //               cy.wrap($el)
  //                 .find('[class*=circle_circle]')
  //                 .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //             }
  //           });
  //           cy.tick(1000);
  //         }
  //       });
  //       cy.get('li')
  //         .should('have.length', Cypress.env('initLength') + 1)
  //         .each(($el, idx) => {
  //           if (idx === +Cypress.env('insertedIdx')) {
  //             cy.wrap($el).within(() => {
  //               cy.get('[class*=circle_circle]').should(
  //                 'have.css',
  //                 'border',
  //                 '4px solid rgb(127, 224, 81)'
  //               );
  //               cy.get('[class*=circle_letter]').should(
  //                 'have.text',
  //                 Cypress.env('insertedVal')
  //               );
  //               cy.get('[class*=circle_index]').should(
  //                 'have.text',
  //                 Cypress.env('insertedIdx')
  //               );
  //             });
  //           }
  //         });
  //       cy.tick(1000);
  //       cy.get('li').each(($el) => {
  //         cy.wrap($el)
  //           .find('[class*=circle_circle]')
  //           .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //       });
  //     }
  //   );
  });

  // describe('Удаление элементов работает корректно', () => {
  //   it('удаление из head', { env: { initLength: 4 } }, () => {
  //     cy.clock();
  //     cy.get('li')
  //       .should('have.length', Cypress.env('initLength'))
  //       .first()
  //       .then(($firstEl) => {
  //         cy.wrap($firstEl)
  //           .find('[class*=circle_letter]')
  //           .then(($firstElLetter) => {
  //             const firstElVal = $firstElLetter[0].textContent;
  //             cy.get('button').contains('Удалить из head').parent().click();
  //             cy.wrap($firstElLetter).should('not.have.text');
  //             cy.wrap($firstEl)
  //               .find('[class*=circle_tail]')
  //               .find('[class*=circle_circle]')
  //               .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
  //               .find('[class*=circle_letter]')
  //               .should('have.text', firstElVal);
  //           });
  //       });
  //     cy.tick(1000);
  //     cy.get('li').should('have.length', Cypress.env('initLength') - 1);
  //   });

  //   it('удаление из tail', { env: { initLength: 4 } }, () => {
  //     cy.clock();
  //     cy.get('li')
  //       .should('have.length', Cypress.env('initLength'))
  //       .last()
  //       .then(($lastEl) => {
  //         cy.wrap($lastEl)
  //           .find('[class*=circle_letter]')
  //           .then(($lastElLetter) => {
  //             const lastElVal = $lastElLetter[0].textContent;
  //             cy.get('button').contains('Удалить из tail').parent().click();
  //             cy.wrap($lastElLetter).should('not.have.text');
  //             cy.wrap($lastEl)
  //               .find('[class*=circle_tail]')
  //               .find('[class*=circle_circle]')
  //               .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
  //               .find('[class*=circle_letter]')
  //               .should('have.text', lastElVal);
  //           });
  //       });
  //     cy.tick(1000);
  //     cy.get('li').should('have.length', Cypress.env('initLength') - 1);
  //   });

  //   it('удаление по индексу', { env: { initLength: 4, delIdx: '2' } }, () => {
  //     cy.clock();
  //     cy.get('li').as('list').should('have.length', Cypress.env('initLength'));
  //     cy.get('input[placeholder="Введите индекс"]').type(Cypress.env('delIdx'));
  //     cy.get('button').contains('Удалить по индексу').parent().click();
  //     cy.get('@list').then(($list) => {
  //       const deletedElVal =
  //         $list[Cypress.env('delIdx')].children[0].children[1].children[0].textContent;

  //       for (let i = 0; i <= Cypress.env('delIdx'); i++) {
  //         cy.wrap($list).each(($el, idx) => {
  //           if (idx <= i) {
  //             cy.wrap($el)
  //               .find('[class*=circle_circle]')
  //               .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
  //           }

  //           if (idx > i) {
  //             cy.wrap($el)
  //               .find('[class*=circle_circle]')
  //               .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //           }
  //         });
  //         cy.tick(1000);
  //       }
  //       cy.wrap($list).each(($el, idx) => {
  //         if (idx === +Cypress.env('delIdx')) {
  //           cy.wrap($el)
  //             .find('[class*=circle_circle]')
  //             .first()
  //             .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
  //             .find('p')
  //             .should('be.empty');
  //           cy.wrap($el)
  //             .find('[class*=circle_tail]')
  //             .first()
  //             .within(() => {
  //               cy.get('[class*=circle_circle]').should(
  //                 'have.css',
  //                 'border',
  //                 '4px solid rgb(210, 82, 225)'
  //               );
  //               cy.get('[class*=circle_letter]').should(
  //                 'have.text',
  //                 deletedElVal
  //               );
  //             });
  //         }
  //       });

  //       cy.tick(1000);

  //       cy.wrap($list)
  //         .should('have.length', Cypress.env('initLength') - 1)
  //         .each(($el) => {
  //           cy.wrap($el)
  //             .find('[class*=circle_circle]')
  //             .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
  //         });
  //     });
  //   });
  // });
});