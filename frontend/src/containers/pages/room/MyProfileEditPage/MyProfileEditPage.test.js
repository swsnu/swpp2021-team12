/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as axios from 'axios';
import MyProfileEditPage from './MyProfileEditPage';

jest.mock('axios');
describe('<MyProfileEditPage/>', () => {
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
          <MyProfileEditPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const pageTem = component.find('MyProfileEditPage');
    expect(pageTem.length).toBe(1);
  });

  it('should get user data', () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: 'dummyData' }));
    const mockUser = mockStore({ auth: { auth: 1 } });
    component = mount(
      <Provider store={mockUser}>
        <BrowserRouter>
          <MyProfileEditPage />
        </BrowserRouter>
      </Provider>,
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should have buttons working', () => {
    axios.get.mockImplementation(() => Promise.resolve('dummyddata'));
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState));
    const mockUser = mockStore({ auth: { auth: 1 } });
    component = mount(
      <Provider store={mockUser}>
        <BrowserRouter>
          <MyProfileEditPage />
        </BrowserRouter>
      </Provider>,
    );
    console.log(component.debug());
    const confirmButton = component.find('#button_confirm').find('button');
    confirmButton.simulate('click');
    expect(confirmButton.length).toBe(1);
  });
});
