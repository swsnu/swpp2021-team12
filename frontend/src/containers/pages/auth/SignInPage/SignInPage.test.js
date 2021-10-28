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
    const pageTem = component.find('AuthTemplate');
    expect(pageTem.length).toBe(1);
  });
  it('should make confirm button working', () => {
    console.log(component.debug());
    const signinButton = component.find('.button SigninButton');
    const signupButton = component.find('.button SignupButton');
    const emailInput = component.find('.field SigninEmailInput');
    const passwordInput = component.find('.field SigninPasswordInput');
    emailInput.simulate('change', { target: { value: 'te@st.te' } });
    passwordInput.simulate('change', { target: { value: 'pp' } });
    signinButton.simulate('click');
    signupButton.simulate('click');
    expect(confirmButton.length).toBe(1);
  });
});
