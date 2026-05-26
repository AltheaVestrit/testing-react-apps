// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import { build, perBuild } from '@jackfranklin/test-data-bot'

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn();
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />);
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  const usernameField = screen.getByLabelText('Username');
  const passwordField = screen.getByLabelText('Password');

  const buildLoginForm = build({
    fields: {
      username: perBuild(() => faker.internet.userName()),
      password: perBuild(() => faker.internet.password())
    }
  });
  
  // const {username, password} = buildLoginForm();
  const {username, password} = buildLoginForm({
    overrides: {
      username: 'abc'
    }
  })
  await userEvent.type(usernameField, username);
  await userEvent.type(passwordField, password);
  // 🐨 click on the button with the text "Submit"
  await userEvent.click(screen.getByRole('button', {name: 'Submit'}));
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({username, password});
})

/*
eslint
  no-unused-vars: "off",
*/
