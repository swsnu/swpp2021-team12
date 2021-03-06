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

  it('should go to main page when logged in', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const store = mockStore({ auth: { id: 1 }, authError: null });
    localStorage.setItem('user', { id: 1 });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AuthTemplate />
        </BrowserRouter>
      </Provider>,
    );

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
