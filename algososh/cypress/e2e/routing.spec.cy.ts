describe('Тестирование_работы_роутинга', () => {
  before(() => {
    cy.visit('http://localhost:3000')
    cy.contains('МБОУ АЛГОСОШ');
  });

  afterEach(() => {
    cy.get('[class^=return-button_button__]').click();
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
});