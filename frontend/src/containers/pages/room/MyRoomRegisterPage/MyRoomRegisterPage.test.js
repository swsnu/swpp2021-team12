/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import MyRoomRegisterPage from './MyRoomRegisterPage';

jest.mock('axios');
describe('<MyRoomRegisterPage />', () => {
  let component;
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyRoomRegisterPage />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should render well', () => {
    const wrapper = component.find('MyRoomRegister');
    expect(wrapper.length).toBe(1);
  });
  it('should handle comfirm', () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState));
    const confirmButton = component.find('#confirm-button').find('button');
    confirmButton.simulate('click');
    expect(confirmButton.length).toBe(1);
  });
});
