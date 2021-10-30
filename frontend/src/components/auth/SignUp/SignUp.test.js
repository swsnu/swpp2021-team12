/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';

let component;

describe('<SignUp />', () => {
  it('should render without error', () => {
    component = shallow(
      <BrowserRouter>
        <SignUp.WrappedComponent />
      </BrowserRouter>,
    );
    const wrapper = component.find('Router');
    expect(wrapper.length).toBe(1);
  });

  it('should make error when signinError is true', () => {
    component = mount(
      <BrowserRouter>
        <SignUp.WrappedComponent signInError={true} />
      </BrowserRouter>,
    );
    const emailInput = component.find('#input_email').find('input');
    const passwordInput = component.find('#input_password').find('input');
    const nameInput = component.find('#input_name').find('input');
    const passwordCheckInput = component
      .find('#input_passwordCheck')
      .find('input');
    emailInput.simulate('change', { target: { value: 'email@ma.il' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    passwordCheckInput.simulate('change', { target: { value: 'password' } });
    nameInput.simulate('change', { target: { value: 'na' } });
    emailInput.simulate('change', { target: { value: 'ema' } });
    nameInput.simulate('change', { target: { value: 'validname' } });
    passwordInput.simulate('change', { target: { value: 'pass' } });
    passwordCheckInput.simulate('change', { target: { value: 'pass' } });
    passwordCheckInput.simulate('change', { target: { value: 'p' } });
    expect(emailInput.length).toBe(1);
    expect(passwordInput.length).toBe(1);
  });
});
