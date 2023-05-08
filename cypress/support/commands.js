Cypress.Commands.add("verifyYourDetails",()=>{
    cy.get("#application_type_single").should('be.checked');
    cy.get("#application_type_joint").should('not.be.checked');
    cy.get("#borrow_type_home").should('be.checked');
    cy.get("#borrow_type_investment").should('not.be.checked');
});

Cypress.Commands.add("verifyYourEarnings",()=>{
    cy.get("#q2q1i1").next('input').invoke("text").should('eq','');
    cy.get("#q2q2i1").next('input').invoke("text").should('eq','');
});

Cypress.Commands.add("verifyYourExpenses",()=>{
    cy.get("#expenses").invoke("text").should('eq','');
    cy.get("#homeloans").invoke("text").should('eq','');
    cy.get("#otherloans").invoke("text").should('eq','');
    cy.get("#q3q4i1").next('input').invoke("text").should('eq','');
    cy.get("#credit").invoke("text").should('eq','');
    cy.get("#borrowResultTextAmount").invoke('text').should('eq','$0');
});
