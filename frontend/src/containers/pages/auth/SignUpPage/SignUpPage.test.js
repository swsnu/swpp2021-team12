/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignUpPage from './SignUpPage';

describe('<SignUpPage/>', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const pageTem = component.find('SignUpPage');
    expect(pageTem.length).toBe(1);
  });

  it('should signup form working', () => {
    const mockSignup = jest.fn();
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpPage onClickConfirmButton={mockSignup} />
        </BrowserRouter>
      </Provider>,
    );
    const signupForm = component.find('#form_signup').find('Form');
    const emailInput = component.find('#input_email').find('Input');
    const nameInput = component.find('#input_name').find('Input');
    const passwordInput = component.find('#input_password').find('Input');
    const passwordCheckInput = component
      .find('#input_passwordCheck')
      .find('Input');
    const confirmButton = component.find('#button_confirm').find('button');
    const signinButton = component.find('#button_signin').find('button');
    emailInput.simulate('change', { target: { value: 'email@ma.il' } });
    nameInput.simulate('change', { target: { value: 'name' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    passwordCheckInput.simulate('change', { target: { value: 'password' } });
    signinButton.simulate('click');
    confirmButton.simulate('click');
    signupForm.simulate('submit');
    expect(signupForm.length).toBe(1);
  });
});
