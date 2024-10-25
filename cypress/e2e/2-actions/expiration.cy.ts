describe("fluxo produtos vencidos", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-in");
    cy.clerkSignIn({
      strategy: "password",
      identifier: "betoteste",
      password: "beto.teste",
    });
  });

  it("criação de vencimento", () => {
    cy.visit("/app/expiration");

    cy.get(".py-8 > .inline-flex").click();

    cy.get('input[name="title"]').type("teste de vencimento");
    cy.get('input[name="amount"]').type("2");
    cy.get("button").contains("Selecione uma data").click();
    cy.get('button[tabindex="0"]').click();
    cy.get('input[name="title"]').click();
    cy.get("button").contains("Salvar").click();
  });

  it("deletar produto vencido", () => {
    cy.visit("/app/expiration");

    cy.intercept('GET', '**/app/expiration?**').as('deleteProduct');
    cy.get(":nth-child(1) > :nth-child(5) > .inline-flex").click();
    cy.wait('@deleteProduct');
  });

  it("filtro ", () => {
    cy.visit("/app/expiration");

    cy.get(".mb-4 > .flex").click();
  });
});
