describe("Forms App", () => {
    beforeEach(() => {
        // Each test needs fresh state!
        cy.visit('http://localhost:3000/'); // CAREFUL
    });

// Helpers
    const firstNameInput = () => cy.get('input[name=first_name]');
    const lastNameInput = () => cy.get('input[name=last_name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const termsOfServiceInput = () => cy.get('input[name=termsOfService]');
    const submitBtn = () => cy.get('button[id=submitButton]');


    it('sanity check to make sure tests work', () => {
        // 'it' is a test
        // 'expect' is an assertion
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5); // strict equality === !===
        expect({}).not.to.equal({}); //strict equality === !===
        expect({}).to.eql({}); // not strict == !==
    });

    it('can type into inputs', () => {
        firstNameInput().type('Billy');
        firstNameInput().should('have.value', 'Billy');
        lastNameInput().type('Paris');
        lastNameInput().should('have.value', 'Paris');
        emailInput().type('billybernard54@gmail.com');
        emailInput().should('have.value', 'billybernard54@gmail.com');
        passwordInput().type('secret');
    });

    it('can check the terms of service box', () => {
        termsOfServiceInput().click();
    });

    it('user can submit the form', () => {
        firstNameInput().type('Billy');
        firstNameInput().should('have.value', 'Billy');
        lastNameInput().type('Paris');
        lastNameInput().should('have.value', 'Paris');
        emailInput().type('billybernard54@gmail.com');
        emailInput().should('have.value', 'billybernard54@gmail.com');
        passwordInput().type('secretSecret');
        termsOfServiceInput().click();
        submitBtn().click();
        cy.contains('Billy');
    })

    it('submit button disabled on empty input', () => {
        firstNameInput().type('Billy');
        //firstNameInput().should('have.value', 'Billy');
        lastNameInput().type('Paris');
        //lastNameInput().should('have.value', 'Paris');
        emailInput().type(' ');
        //emailInput().should('have.value', 'billybernard54@gmail.com');
        passwordInput().type('secretSecret');
        termsOfServiceInput().click();
        termsOfServiceInput().should('have.checked', 'true');
        submitBtn().should('be.disabled');
    })
});
    