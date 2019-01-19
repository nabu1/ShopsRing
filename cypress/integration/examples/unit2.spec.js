/* eslint-disable rule */
const mountVue = require('cypress-vue-unit-test')

describe('Declarative rendering', () => {
  const template = `
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
  `

  const data = {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }

  beforeEach(mountVue({ template, data }))

  it('shows 3 items', () => {
    cy.get('li').should('have.length', 3)
  })

  it('can add an item', () => {
    Cypress.vue.todos.push({ text: 'Test using Cypress' })
    cy.get('li').should('have.length', 4)
  })
})
