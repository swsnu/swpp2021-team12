/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as axios from 'axios';
import MyProfilePage from './MyProfilePage';

jest.mock('axios');
describe('<MyProfilePage/>', () => {
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
          <MyProfilePage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const pageTem = component.find('MyProfilePage');
    expect(pageTem.length).toBe(1);
  });

  it('should get user data', () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: 'dummyData' }));
    const mockUser = mockStore({ auth: { auth: 1 } });
    component = mount(
      <Provider store={mockUser}>
        <BrowserRouter>
          <MyProfilePage />
        </BrowserRouter>
      </Provider>,
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
