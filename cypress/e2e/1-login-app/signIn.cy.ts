

describe("Teste de login com email e senha", () => {
  it("Check Clerk loaded", () => {
    cy.visit(`/auth/sign-in`);
    cy.clerkLoaded();
  });

  it("Sign in", () => {
    cy.visit("/app");
    cy.visit("/auth/sign-in");
    cy.clerkSignIn({
      strategy: "password",
      identifier: "betoteste",
      password: "beto.teste",
    });
    cy.visit("/app");
    cy.clerkSignOut();
  });
});
