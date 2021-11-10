/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MyRoomPendingPage from './MyRoomPendingPage';

describe('<MyRoomPendingPage />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  let component;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyRoomPendingPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const PageTem = component.find('MyRoomPendingPage');
    expect(PageTem.length).toBe(1);
  });
});
