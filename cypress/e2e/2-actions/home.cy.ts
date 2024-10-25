describe("Home", () => {
  it("Header login", () => {
    cy.visit("/");
    cy.get('.pt-4 > [href="/auth/sign-in"]').click();

    cy.get(".cl-headerTitle").should("have.text", "Entrar");
  });

  it("Header criação de conta", () => {
    cy.visit("/");
    cy.get('a[href="/auth/sign-up"]').click();

    cy.get(".cl-headerTitle").should("have.text", "Criar sua conta");
  });

  it("CTA", () => {
    cy.visit("/");
    cy.get('a[href="/auth/sign-in"]').last().click();

  });
});
