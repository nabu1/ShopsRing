/* eslint-disable */
const mountVue = require('cypress-vue-unit-test')

describe('Declarative rendering', () => {
  const template = `
    <div id="app">
      {{ message }}
    </div>
  `

  const data = {
    message: 'Hello Vue!'
  }

  // that's all you need to do
  beforeEach(mountVue({ template, data }))

  it('shows hello', () => {
    cy.contains('Hello Vue!')
  })

  it('changes message if data changes', () => {
    // mounted Vue instance is available under Cypress.vue
    Cypress.vue.message = 'Vue rocks!'
    cy.contains('Vue rocks!')
  })
})
