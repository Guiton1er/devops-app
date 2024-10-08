const taskTest = {
  title: 'This is a test !',
  date: '2000-01-01',
}
const successMessageTest = 'Tâche ajoutée avec succès !';
const errorMessageTest = 'Veuillez remplir tous mes champs !';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=text]').type(taskTest.title);
    cy.get('input[type=date]').type(taskTest.date);

    cy.get('button[type=submit]').click();

    cy.contains(successMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      const tasks = JSON.parse(ls[Cypress.config().baseUrl].tasks_db);
      expect(tasks[0]).to.deep.equal(taskTest);
    });

    cy.clearAllLocalStorage();
  }),

  it('Try without date', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=text]').type(taskTest.title);

    cy.get('button[type=submit]').click();

    cy.contains(errorMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    });
  }),

  it('Try without title', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=date]').type(taskTest.date);

    cy.get('button[type=submit]').click();

    cy.contains(errorMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    });
  })
})