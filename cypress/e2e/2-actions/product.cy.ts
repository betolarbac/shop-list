describe("fluxo de produtos", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-in");
    cy.clerkSignIn({
      strategy: "password",
      identifier: "betoteste",
      password: "beto.teste",
    });
  });

  it("Criação de produto", () => {
    cy.visit("/app");
    cy.get(".py-8 > .inline-flex")
      .should("have.text", "Adicionar produto")
      .click();
    cy.get('input[name="title"]').type("teste de produto");
    cy.get('input[name="amount"]').type("2");
    cy.get('input[name="value"]').type("100");
    cy.get("button").contains("Salvar").click();

    cy.get(":nth-child(1) > .capitalize").contains("teste de produto");
  });

  it("Deletar produto", () => {
    cy.visit("/app");
    cy.get(':nth-child(1) > :nth-child(4) > .inline-flex').click();
  });
});
