// component use axios to get list of users
created() {
  axios.get(`http://jsonplaceholder.typicode.com/users?_limit=3`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.users = response.data
    })
}
// test can observe, return mock data, delay and a lot more
beforeEach(mountVue(AjaxList))
it('can inspect real data in XHR', () => {
  cy.server()
  cy.route('/users?_limit=3').as('users')
  cy.wait('@users').its('response.body').should('have.length', 3)
})
it('can display mock XHR response', () => {
  cy.server()
  const users = [{ id: 1, name: 'foo' }]
  cy.route('GET', '/users?_limit=3', users).as('users')
  cy.get('li').should('have.length', 1)
    .first().contains('foo')
})
