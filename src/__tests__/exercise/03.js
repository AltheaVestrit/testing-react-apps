// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here:
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  const {container} = render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const decrement = screen.getByRole('button', {name: 'Decrement'});
  const increment = screen.getByRole('button', {name: 'Increment'});
  const message = screen.getByText(/^Current count:/);

  expect(message).toHaveTextContent('Current count: 0')
  // fireEvent.click(increment)
  await userEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1')
  // fireEvent.click(decrement)
  await userEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0')
})
