/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';

describe('App.js', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    articles: {},
    auth: {},
    comments: {},
  });
  let component;
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const app = component.find('App');
    expect(app.length).toBe(1);
  });
});
