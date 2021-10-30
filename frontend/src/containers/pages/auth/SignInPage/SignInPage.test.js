/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignInPage from './SignInPage';

describe('<SignInPage/>', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignInPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const pageTem = component.find('SignInPage');
    expect(pageTem.length).toBe(1);
  });
  it('should signin form working', () => {
    const mockSignin = jest.fn();
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignInPage onClickSignInButton={mockSignin} />
        </BrowserRouter>
      </Provider>,
    );
    const signinForm = component.find('#form_signin').find('Form');
    const emailInput = component.find('#input_email').find('Input');
    const passwordInput = component.find('#input_email').find('Input');
    const signinButton = component.find('#button_signin').find('button');
    const signupButton = component.find('#button_signup').find('button');
    emailInput.simulate('change', { target: { value: 'email@ma.il' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    signinButton.simulate('click');
    signupButton.simulate('click');
    signinForm.simulate('submit');
    expect(signinForm.length).toBe(1);
  });
});
