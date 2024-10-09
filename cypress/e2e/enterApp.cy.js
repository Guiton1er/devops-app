const TASKS_STORAGE_KEYS = "tasks_db";
const taskTest = {
  title: 'This is a test !',
  date: new Date().toISOString().split("T")[0],
}
const successMessageTest = "Task added successfully !";
const errorMessageTest = "Please fill the formulary !";

describe('template spec', () => {
  it('Try a valid form', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=text]').type(taskTest.title);
    cy.get('input[type=date]').type(taskTest.date);

    cy.get('button[type=submit]').click();

    cy.contains(successMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      const tasks = JSON.parse(ls[Cypress.config().baseUrl].tasks_db);
      expect(tasks[0]).to.deep.equal(taskTest);
    });

    cy.contains(taskTest.title);

    cy.clearAllLocalStorage();
  }),

  it('Try without date', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=text]').type(taskTest.title);

    cy.get('button[type=submit]').click();

    cy.contains(errorMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl][TASKS_STORAGE_KEYS]).to.be.equal("[]");
    });
    cy.clearAllLocalStorage();
  }),

  it('Try without title', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type=date]').type(taskTest.date);

    cy.get('button[type=submit]').click();

    cy.contains(errorMessageTest);

    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl][TASKS_STORAGE_KEYS]).to.be.equal("[]");
    });
    cy.clearAllLocalStorage();
  })

  it('Try previous are displed in calendar', () => {
    cy.visit('http://localhost:5173');

    localStorage.setItem(TASKS_STORAGE_KEYS, JSON.stringify([taskTest]));

    cy.contains(taskTest.title);
  })
})