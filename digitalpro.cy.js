describe('DigitalPro E2E тесты', () => {
  it('Должен открыть главную страницу', () => {
    cy.visit('https://digitalpro.vercel.app');
    cy.contains('DigitalPro').should('be.visible');
  });

  it('Должен добавить товар в корзину', () => {
    cy.visit('https://digitalpro.vercel.app/catalog');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart-btn"]').click();
    cy.get('[data-testid="cart-counter"]').should('contain', '1');
  });

  it('Должен отфильтровать товары по категории', () => {
    cy.visit('https://digitalpro.vercel.app/catalog');
    cy.get('select[name="category"]').select('курсы');
    cy.get('button').contains('Фильтровать').click();
    cy.get('[data-testid="product-card"]').each(($el) => {
      cy.wrap($el).should('contain', 'курс');
    });
  });
});