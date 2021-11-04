/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';

let component;

describe('<SignIn />', () => {
  it('should render without error', () => {
    component = shallow(
      <BrowserRouter>
        <SignIn.WrappedComponent />
      </BrowserRouter>,
    );
    const wrapper = component.find('Router');
    expect(wrapper.length).toBe(1);
  });

  it('should make error when signinError is true', () => {
    component = mount(
      <BrowserRouter>
        <SignIn.WrappedComponent signInError={true} />
      </BrowserRouter>,
    );
    const emailInput = component.find('#input_email').find('input');
    const passwordInput = component.find('#input_password').find('input');
    emailInput.simulate('change', { target: { value: 'email' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    expect(emailInput.length).toBe(1);
    expect(passwordInput.length).toBe(1);
  });
});
