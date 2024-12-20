import Quiz from "../../client/src/components/Quiz"

describe('Quiz Component Test', () => {
  beforeEach(() => {
    cy.intercept({
        method: 'GET',
        url: '/api/questions/random'
      },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
      ).as('getRandomQuestion')
    });

  it('start the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
  });

  it('should complete the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    cy.get('button').contains('1').click();

    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  });

  it('restart the quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();

    cy.get('button').contains('1').click();

    cy.get('button').contains('Take New Quiz').click();

    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});
