import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content with only title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author:'XYZ',
    likes: 20,
    url:'xyz.com',
    user: { 'name':'SuperTester' }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library XYZ'
  )
})

test('after clicking the button, children are displayed', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author:'XYZ',
    likes: 20,
    url:'xyz.com',
    user: { 'name':'SuperTester' }
  }
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('View')
  fireEvent.click(button)
  const url_component = component.container.querySelector('.url')
  const likes_component = component.container.querySelector('.likes')
  // const div = component.container.querySelector('.togglableContent')
  // expect(div).not.toHaveStyle('display: none')
  //   expect(likes_component).toBe(
  //     20
  //   )
  expect(url_component).toHaveTextContent(
    'xyz.com'
  )
  console.log(prettyDOM(likes_component))
})

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author:'XYZ',
    likes: 20,
    url:'xyz.com',
    user: { 'name':'SuperTester' }
  }


  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} increaseLikes={mockHandler}/>
  )
  const likes_component = component.container.querySelector('.likes')
  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
  console.log(prettyDOM(likes_component))

})