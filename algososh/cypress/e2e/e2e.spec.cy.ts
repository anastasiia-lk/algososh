describe('Тестирование_доступности_сервиса', () => {
  it('доступен_на_localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
}); 

describe('Тестирование_работы_роутинга', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.contains('МБОУ АЛГОСОШ');
  });

  afterEach(() => {
    cy.get('[class^=return-button_button__]').click();
  });

  it('страница_"стек"_доступна_пользователю', () => {
    cy.get('a[href$="stack"]').click();
    cy.contains('Стек');
  });

  it('страница_"очередь"_доступна_пользователю', () => {
    cy.get('a[href$="queue"]').click();
    cy.contains('Очередь');
  });

  it('страница_"связный_список"_доступна_пользователю', () => {
    cy.get('a[href$="list"]').click();
    cy.contains('Связный список');
  });

  it('страница_"строка"_доступна_пользователю', () => {
    cy.get('a[href$="recursion"]').click();
    cy.contains('Строка');
  });

  it('страница_"последовательность_Фибоначчи"_доступна_пользователю', () => {
    cy.get('a[href$="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('страница_"сортировка_массива"_доступна_пользователю', () => {
    cy.get('a[href$="sorting"]').click();
    cy.contains('Сортировка массива');
  });
});

describe('Тестирование_работы_страницы_"строка"', () => {
  before(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('если_в_инпуте_пусто_то_кнопка_недоступна', () => {
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

  it('строка_разворачивается_корректно', () => {
    cy.clock();
    cy.get('input').type('tsx');
    cy.get('button').last().as('reverseBtn').click();
    cy.get('[class^=circle_circle]').each(($el, idx) => {
      cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      if (idx === 0) cy.wrap($el).contains('t');
      if (idx === 1) cy.wrap($el).contains('s');
      if (idx === 2) cy.wrap($el).contains('x');
    });

    cy.tick(1000);

    cy.get('[class^=circle_circle]').each(($el, idx) => {
      if (idx === 0 || idx === 2) {
        cy.wrap($el).should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)'
        );
        if (idx === 0) cy.wrap($el).contains('t');
        if (idx === 2) cy.wrap($el).contains('x');
      }
      if (idx === 1) {
        cy.wrap($el).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        if (idx === 1) cy.wrap($el).contains('s');
      }
    });

    cy.tick(1000);

    cy.get('[class^=circle_circle]').each(($el, idx) => {
      if (idx === 0 || idx === 2) {
        cy.wrap($el).should(
          'have.css',
          'border',
          '4px solid rgb(127, 224, 81)'
        );
        if (idx === 0) cy.wrap($el).contains('x');
        if (idx === 2) cy.wrap($el).contains('t');
      }
      if (idx === 1) {
        cy.wrap($el).should(
          'have.css',
          'border',
          '4px solid rgb(210, 82, 225)'
        );
        if (idx === 1) cy.wrap($el).contains('s');
      }
    });

    cy.tick(1000);

    cy.get('[class^=circle_circle]').each(($el, idx) => {
      if (idx === 0 || idx === 2) {
        cy.wrap($el).should(
          'have.css',
          'border',
          '4px solid rgb(127, 224, 81)'
        );
        if (idx === 0) cy.wrap($el).contains('x');
        if (idx === 2) cy.wrap($el).contains('t');
      }
      if (idx === 1) {
        cy.wrap($el).should(
          'have.css',
          'border',
          '4px solid rgb(127, 224, 81)'
        );
        if (idx === 1) cy.wrap($el).contains('s');
      }
    });
  });
});

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

describe('Тестирование_работы_страницы_"список"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it(
    'проверка_корректности_добавления_в_head',
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

  it('проверка_корректности_удаления_из_head', { env: { listLength: 4 } }, () => {
    cy.clock();
    cy.get('li')
      .should('have.length', Cypress.env('listLength'))
      .first()
      .then(($firstEl) => {
        cy.wrap($firstEl)
          .find('[class*=circle_letter]')
          .then(($firstElLetter) => {
            const firstElVal = $firstElLetter[0].textContent;
            cy.get('button').contains('Удалить из head').parent().click();
            cy.wrap($firstElLetter).should('not.have.text');
            cy.wrap($firstEl)
              .find('[class*=circle_tail]')
              .find('[class*=circle_circle]')
              .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
              .find('[class*=circle_letter]')
              .should('have.text', firstElVal);
          });
      });
    cy.tick(1000);
    cy.get('li').should('have.length', Cypress.env('listLength') - 1);
  });

  it(
    'проверка_корректности_добавления_в_tail',
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

  it('проверка_корректности_удаления_из_tail', { env: { listLength: 4 } }, () => {
    cy.clock();
    cy.get('li')
      .should('have.length', Cypress.env('listLength'))
      .last()
      .then(($lastEl) => {
        cy.wrap($lastEl)
          .find('[class*=circle_letter]')
          .then(($lastElLetter) => {
            const lastElVal = $lastElLetter[0].textContent;
            cy.get('button').contains('Удалить из tail').parent().click();
            cy.wrap($lastElLetter).should('not.have.text');
            cy.wrap($lastEl)
              .find('[class*=circle_tail]')
              .find('[class*=circle_circle]')
              .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
              .find('[class*=circle_letter]')
              .should('have.text', lastElVal);
          });
      });
    cy.tick(1000);
    cy.get('li').should('have.length', Cypress.env('listLength') - 1);
  });

  it(
    'проверка_корректности_добавления_по_индексу',
    { env: { addItem: '79', addIndex: '2', listLength: 4 } },
    () => {
      cy.clock();
      cy.get('li')
        .as('list')
        .should('have.length', Cypress.env('listLength'));
      cy.get('input[placeholder="Введите значение"]').type(
        Cypress.env('addItem')
      );
      cy.get('input[placeholder="Введите индекс"]').type(
        Cypress.env('addIndex')
      );
      cy.get('button').contains('Добавить по индексу').parent().click();
      cy.get('@list').then(($list) => {
        for (let i = 0; i <= Cypress.env('addIndex'); i++) {
          cy.wrap($list).each(($el, idx) => {
            if (idx < i) {
              cy.wrap($el)
                .find('[class*=circle_circle]')
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            }
            if (idx === i) {
              cy.wrap($el)
                .find('[class*=circle_head]')
                .find('[class*=circle_circle]')
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            }
            if (idx > i) {
              cy.wrap($el)
                .find('[class*=circle_circle]')
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
            }
          });
          cy.tick(1000);
        }
      });
      cy.get('li')
        .should('have.length', Cypress.env('listLength') + 1)
        .each(($el, idx) => {
          if (idx === +Cypress.env('addIndex')) {
            cy.wrap($el).within(() => {
              cy.get('[class*=circle_circle]').should(
                'have.css',
                'border',
                '4px solid rgb(127, 224, 81)'
              );
              cy.get('[class*=circle_letter]').should(
                'have.text',
                Cypress.env('addItem')
              );
              cy.get('[class*=circle_index]').should(
                'have.text',
                Cypress.env('addIndex')
              );
            });
          }
        });
      cy.tick(1000);
      cy.get('li').each(($el) => {
        cy.wrap($el)
          .find('[class*=circle_circle]')
          .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      });
    }
  );

  it('проверка_корректности_удаления_по_индексу', { env: { listLength: 4, delIndex: '2' } }, () => {
    cy.clock();
    cy.get('li').as('list').should('have.length', Cypress.env('listLength'));
    cy.get('input[placeholder="Введите индекс"]').type(Cypress.env('delIndex'));
    cy.get('button').contains('Удалить по индексу').parent().click();
    cy.get('@list').then(($list) => {
      const deletedElVal =
        $list[Cypress.env('delIndex')].children[0].children[1].children[0].textContent;

      for (let i = 0; i <= Cypress.env('delIndex'); i++) {
        cy.wrap($list).each(($el, idx) => {
          if (idx <= i) {
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          }

          if (idx > i) {
            cy.wrap($el)
              .find('[class*=circle_circle]')
              .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
          }
        });
        cy.tick(1000);
      }
      cy.wrap($list).each(($el, idx) => {
        if (idx === +Cypress.env('delIndex')) {
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .first()
            .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
            .find('p')
            .should('be.empty');
          cy.wrap($el)
            .find('[class*=circle_tail]')
            .first()
            .within(() => {
              cy.get('[class*=circle_circle]').should(
                'have.css',
                'border',
                '4px solid rgb(210, 82, 225)'
              );
              cy.get('[class*=circle_letter]').should(
                'have.text',
                deletedElVal
              );
            });
        }
      });

      cy.tick(1000);

      cy.wrap($list)
        .should('have.length', Cypress.env('listLength') - 1)
        .each(($el) => {
          cy.wrap($el)
            .find('[class*=circle_circle]')
            .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        });
    });
  });

    it('проверка_корректности_кнопок_"добавить_в_head"_и_"добавить_в_tail"', () => {
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

    it('проверка_корректности_кнопок_"добавить_по_индексу"_и_"удалить_по_индексу"', () => {
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
});

describe('Тестирование_работы_страницы_"стек"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('если_в_инпуте_пусто_то_кнопка_недоступна', () => {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .as('addBtn')
      .should('be.disabled');
    cy.get('input').type('777');
    cy.get('@addBtn').should('be.enabled');
    cy.get('input').type('{backspace}{backspace}{backspace}');
    cy.get('@addBtn').should('be.disabled');
  });

  it('правильность_добавления_элемента_в_стек', () => {
    cy.clock();
    cy.get('input').type('7');
    cy.get('button').contains('Добавить').parent().click();

    cy.get('[class*=circle_content]').within(() => {
      cy.get('[class*=circle_circle]').should(
        'have.css',
        'border',
        '4px solid rgb(210, 82, 225)'
      );
      cy.get('[class*=circle_string]').should('have.text', 'top');
      cy.get('[class*=circle_letter]').should('have.text', '7');
      cy.get('[class*=circle_index]').should('have.text', '0');
    });

    cy.tick(1000);

    cy.get('[class*=circle_content]').within(() => {
      cy.get('[class*=circle_circle]').should(
        'have.css',
        'border',
        '4px solid rgb(0, 50, 255)'
      );
    });
  });

  it('правильность_удаления_элемента_из_стека', () => {
    cy.clock();
    cy.get('button')
      .contains('Удалить')
      .parent()
      .as('delBtn')
    cy.get('input').type('7');
    cy.get('button').contains('Добавить').parent().as('addBtn').click();
    cy.tick(1000);
    cy.get('li').as('list').should('have.length', '1');
    cy.get('@delBtn').should('be.enabled').click();
    cy.get('@list').within(() => {
      cy.get('[class*=circle_circle]')
        .last()
        .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    });
    cy.tick(1000);
    cy.get('@list').should('have.length', 0);
  });

  it('проверка_поведения_кнопки_"очистить"', () => {
    cy.clock();
    cy.get('button')
      .contains('Очистить')
      .parent()
      .as('clBtn')
    cy.get('button').contains('Добавить').parent().as('addBtn');
    cy.get('input').type('7');
    cy.get('@addBtn').click();
    cy.tick(1000);
    cy.get('input').type('9');
    cy.get('@addBtn').click();
    cy.tick(1000);
    cy.get('ul').as('list').should('not.be.empty');
    cy.get('@clBtn').click();
    cy.get('@list').should('be.empty');
  });
});

describe('Тестирование_работы_страницы_"очередь"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
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
});