/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthTemplate from './AuthTemplate';

describe('<AuthTemplate/>', () => {
  const mockStore = configureMockStore();
  let component;

  it('should go back after signup succeed', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const store = mockStore({
      auth: { auth: { type: 'SIGNUP' }, authError: null },
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AuthTemplate />
        </BrowserRouter>
      </Provider>,
    );
    const authTemplate = component.find('AuthTemplate');
    expect(authTemplate.length).toBe(1);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('should go back after signiin succeed', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const store = mockStore({
      auth: { auth: { type: 'SIGNIN' }, authError: null },
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AuthTemplate />
        </BrowserRouter>
      </Provider>,
    );
    const authTemplate = component.find('AuthTemplate');
    expect(authTemplate.length).toBe(1);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
