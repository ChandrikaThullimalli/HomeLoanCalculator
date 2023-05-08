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
            cy.get(".borrow__result__action > .result__restart > .start-over").should("be.visible");
            });
        });
    });

    it('start over and validate field reset', () => {

        //Click on Start Over and verify all the fields
        cy.get(".start-over").click({multiple:true,force: true}).then(()=>{
            //Verify Your Details
            cy.verifyYourDetails();
            //Verify Your Earnings
            cy.verifyYourEarnings();
            //Verify Your Expenses
            cy.verifyYourExpenses();
        });
    });

});
