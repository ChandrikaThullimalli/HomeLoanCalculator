//StoryNumber:0000 QA : Test scripts to validate the Home Loan Estimate and reset option
describe('Home Loan Calculator App', () => {
    beforeEach(() => {
      cy.visit(`${Cypress.config("baseURL")}`);
    });

    it('fill the form and verify the borrowing estimate', () => {
        cy.title().should("eq","Home loan borrowing power calculator | ANZ");
        cy.contains("How much could I borrow?").should("be.visible");
        //Fill Your Details
        cy.fixture('HomeLoanEstimateData').then(function(regdata){
            this.regdata=regdata;
        cy.get(this.regdata.ApplicantType).click();
        cy.get("[title = 'Number of dependants']").select(this.regdata.Dependants);
        cy.get("#borrow_type_home").click();

        //Fill Your Earnings
        cy.contains("Your annual income (before tax)").next('div').find('input').type(this.regdata.AnnualIncome);
        cy.get("#q2q2i1").next('input').type(this.regdata.OtherAnnualIncome);

        //Fill Your Expenses
        cy.get("#expenses").type(this.regdata.MonthlyLivingExpenses);
        cy.get("#homeloans").type(this.regdata.Repayments);
        cy.get("#otherloans").type(this.regdata.OtherRepayments);
        cy.get("#q3q4i1").next('input').type(this.regdata.Commitments);
        cy.get("#credit").type(this.regdata.CreditCardLimit);

        //Verify Estimated Borrow result
        cy.get("#btnBorrowCalculater").click().then(()=>{
            cy.get("#borrowResultTextAmount").invoke('text').should('eq',this.regdata.Estimate);
            cy.get(".start-over").should("be.visible");
        });
        });
    });

    it('start over and validate field reset', () => {
        cy.get(".start-over").click({multiple:true,force: true},()=>{
            //Verify Your Details
            cy.get("#application_type_single :checked").should('be.checked');
            cy.get("#application_type_joint").should('not.be.checked');
            cy.get("#borrow_type_home :checked").should('be.checked');
            cy.get("#borrow_type_investment").should('not.be.checked');
            cy.get("[title = 'Number of dependants']").invoke('text').should('eq','0')

            //Verify Your Earnings
            cy.get("#q2q1i1").next('input').invoke("value").eq(0);
            cy.get("#q2q2i1").next('input').invoke("value").eq(0);

            //Verify Your Expenses
            cy.get("#expenses").invoke("value").eq(0);
            cy.get("#homeloans").invoke("value").eq(0);
            cy.get("#otherloans").invoke("value").eq(0);
            cy.get("#q3q4i1").next('input').invoke("value").eq(0);
            cy.get("#credit").invoke("value").eq(0);
            cy.get("#borrowResultTextAmount").invoke('text').should('eq','0');
        });

    });

})
