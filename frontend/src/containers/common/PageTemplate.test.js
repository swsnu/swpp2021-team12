/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PageTemplate from './PageTemplate';

describe('<PageTemplate/>', () => {
  const mockStore = configureMockStore();
  // eslint-disable-next-line no-unused-vars
  let component;

  it('should handle logout sequence and error', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const store = mockStore({ auth: { id: 1 } });
    localStorage.setItem('user', { id: 1 });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PageTemplate />
        </BrowserRouter>
      </Provider>,
    );

    localStorage.clear();
    const newstore = mockStore({
      auth: { auth: null, authError: 'error' },
    });
    component = mount(
      <Provider store={newstore}>
        <BrowserRouter>
          <PageTemplate />
        </BrowserRouter>
      </Provider>,
    );

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
