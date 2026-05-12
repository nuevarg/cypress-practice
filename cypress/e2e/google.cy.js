describe('Google Search', () => {
  it('opens google', () => {
    cy.visit('https://google.com')
    cy.screenshot('google-homepage')
  })
})