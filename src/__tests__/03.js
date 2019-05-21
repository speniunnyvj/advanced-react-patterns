import React from 'react'
import {renderToggle} from '../../test/utils'
import Usage from '../exercises-final/03'
// import Usage from '../exercises/03'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toEqual([['onToggle', true]])
})
