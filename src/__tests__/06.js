import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/07'
// import Usage from '../exercises/07'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toEqual([['onToggle', true]])
})

test('can click too much', () => {
  const {
    toggleButton,
    toggle,
    getByTestId,
    queryByTestId,
    getByText,
    queryByText,
  } = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle() // 1
  expect(toggleButton).toBeOn()
  toggle() // 2
  expect(toggleButton).toBeOff()
  expect(getByTestId('click-count')).toHaveTextContent('2')
  toggle() // 3
  expect(toggleButton).toBeOn()
  expect(queryByText(/whoa/i)).not.toBeInTheDocument()
  toggle() // 4
  expect(toggleButton).toBeOn()
  expect(getByText(/whoa/i)).toBeInTheDocument()
  toggle() // 5: Whoa, too many
  expect(toggleButton).toBeOn()
  toggle() // 6
  expect(toggleButton).toBeOn()

  expect(getByTestId('notice')).not.toBeNull()
  expect(console.info.mock.calls).toEqual([
    ['onToggle', true], // 1
    ['onToggle', false], // 2
    ['onToggle', true], // 3
    ['onToggle', false], // 4
    ['onToggle', false], // 5
    ['onToggle', false], // 6
  ])

  console.info.mockClear()

  fireEvent.click(getByText('Reset'))
  expect(console.info.mock.calls).toEqual([['onReset', false]])
  expect(queryByTestId('notice')).toBeNull()

  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()

  expect(getByTestId('click-count')).toHaveTextContent('1')
})
