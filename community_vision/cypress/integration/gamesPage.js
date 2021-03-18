const { ExpansionPanelActions } = require("@material-ui/core")
const { cyan } = require("@material-ui/core/colors")
const { interpolate } = require("react-spring")

// ./node_modules/.bin/cypress open

describe('Games page', function () {
    it('Navigates to Games page and tests back button', function () {
        // Arrange - setup initial app state
        // - visit Learning Alphabet game page
        // - query for an element
        cy.visit('http://localhost:3000/')
        // Act - take an action
        // - interact with that element
        cy.contains('Play Morse!')
        cy.contains('Play Games!').click()
        cy.contains('Play Games!').click()
        cy.url()
            .should('include','/games')

        // Assert - make an assertion
        // - make an assertion about page content

        //Go back button should go back to home page
        cy.contains("Go back").click()
        cy.url().should("include", "/")

    })
})