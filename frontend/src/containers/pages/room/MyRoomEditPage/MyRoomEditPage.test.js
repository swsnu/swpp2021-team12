/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import MyRoomEditPage from './MyRoomEditPage';

jest.mock('axios');
describe('<MyRoomEditPage />', () => {
  let component;
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({
      data: { title: 'title', description: 'des', capacity: 10 },
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyRoomEditPage />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should render well', () => {
    const wrapper = component.find('MyRoomRegister');
    expect(wrapper.length).toBe(1);
  });
});
