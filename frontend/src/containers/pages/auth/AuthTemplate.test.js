/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthTemplate from './AuthTemplate';

describe('<AuthTemplate/>', () => {
  const mockStore = configureMockStore();
  // eslint-disable-next-line no-unused-vars
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
    const newstore = mockStore({
      auth: { auth: { type: 'SIGNIN' }, authError: null },
    });
    component = mount(
      <Provider store={newstore}>
        <BrowserRouter>
          <AuthTemplate />
        </BrowserRouter>
      </Provider>,
    );

    expect(window.alert).toHaveBeenCalledTimes(2);
  });
});
