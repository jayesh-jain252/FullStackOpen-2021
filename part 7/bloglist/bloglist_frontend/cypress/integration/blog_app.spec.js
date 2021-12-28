// describe('Blog app', function() {
//   beforeEach(function() {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     cy.visit('http://localhost:3000')
//   })

//   it('Login form is shown', function() {
//     cy.contains('Log in to application')
//     cy.contains('username')
//     cy.contains('password')
//   })
// })

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Arth Joe',
      username: 'arth',
      password: 'Secret321'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('arth')
      cy.get('#password').type('Secret321')
      cy.get('#login-button').click()

      cy.contains('Arth Joe logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('arth')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('arth')
      cy.get('#password').type('Secret321')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('XYZ')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()
      cy.contains('a blog created by cypress XYZ')

    })

    it('A user can like a blog', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('XYZ')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()
      cy.contains('View').click()
      cy.contains('0')
      cy.get('#likebutton').click()
      cy.contains('1')

    })

    it('A user can delete a blog', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('XYZ')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()
      cy.contains('View').click()
      cy.get('#deletebutton').click()
      cy.contains('Deleted a blog created by cypress')
    })
  })

  describe('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.get('#username').type('arth')
      cy.get('#password').type('Secret321')
      cy.get('#login-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test1')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test2')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test3')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('abcd.com')
      cy.get('#create').click()

      cy.contains('test1 John Doe').parent().parent().as('blog1')
      cy.contains('test2 John Doe').parent().parent().as('blog2')
      cy.contains('test3 John Doe').parent().parent().as('blog3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('View').click()
      cy.get('@blog2').contains('View').click()
      cy.get('@blog3').contains('View').click()
      cy.get('@blog1').contains('Like').as('like1')
      cy.get('@blog2').contains('Like').as('like2')
      cy.get('@blog3').contains('Like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })

  })
})