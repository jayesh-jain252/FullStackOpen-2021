const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('of empty list is zero', () => {
    const blogs = []
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
})

test('when list has only one blog equals the likes of that', () => {
    const blogs = [{"blog":"First blog","likes":99}]
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(99)
})

test('of a bigger list is calculated right', () => {
    const blogs = [{"blog":"First blog","likes":99},{"blog":"Second blog","likes":101},{"blog":"Third blog","likes":100}]
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(300)
})

describe('blog with max likes', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Shortcut Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },{
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Long Path Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      }
    ]
  
    test('when list has more than one blog the one with maximum', () => {
      const result = listHelper.favoriteBlog(listWithBlogs)
      expect(result).toEqual({
        "title": 'Go To Statement Long Path Harmful',
        "author": 'Edsger W. Dijkstra',
        "likes": 15
        })
    })
  })

  describe('Max number of blogs by an author', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Shortcut Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },{
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Long Path Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Epic Blog',
        author: 'Darwin',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 29,
        __v: 0
      }
    ]
  
    test('when list has more than one blog author with most blogs', () => {
      const result = listHelper.mostBlogs(listWithBlogs)
      expect(result).toEqual({
        "author": 'Edsger W. Dijkstra',
        "blogs": 3
        })
    })
  })

  describe('Most Liked author', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Shortcut Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },{
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Long Path Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Epic Blog',
        author: 'Darwin',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 29,
        __v: 0
      }
    ]
  
    test('when list has more than one blog author with most likes', () => {
      const result = listHelper.mostLikes(listWithBlogs)
      expect(result).toEqual({
        "author": 'Edsger W. Dijkstra',
        "likes": 30
        })
    })
  })