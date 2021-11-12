/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as axios from 'axios';
import MyProfileEditPage from './MyProfileEditPage';

const runAllPromises = () => new Promise(setImmediate);
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
    expect(component.find('MyProfileEditPage').length).toBe(1);
  });

  it('should have buttons working', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: { name: 'name', email: 'email', selfIntro: 'intro' },
      }),
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: { name: 'name', email: 'email', selfIntro: 'intro' },
      }),
    );
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        data: { name: 'name', email: 'email', selfIntro: 'intro' },
      }),
    );
    axios.mockImplementation(() =>
      Promise.resolve({
        data: { name: 'name', email: 'email', selfIntro: 'intro' },
      }),
    );
    const mockUser = mockStore({ auth: { auth: 1 } });
    const realUseState = React.useState;
    const stubInitialState = ['stub data'];
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState));
    component = mount(
      <Provider store={mockUser}>
        <BrowserRouter>
          <MyProfileEditPage />
        </BrowserRouter>
      </Provider>,
    );
    await runAllPromises();
    component.update();

    expect(component.find('.MyProfileEdit').length).toBe(1);
    const confirmButton = component.find('#button_confirm').find('button');
    confirmButton.simulate('click');
    const deleteButton = component.find('#button_delete').find('button');
    deleteButton.simulate('click');
    confirmButton.simulate('click');
    const fileInput = component.find('#input_file').find('input');
    const introInput = component.find('#input_intro').find('input');
    introInput.simulate('change', { target: { value: 'fsds' } });
    fileInput.simulate('change', {
      target: {
        files: [new Blob([new ArrayBuffer('data')], { type: 'image/png' })],
      },
    });
    confirmButton.simulate('click');
    expect(confirmButton.length).toBe(1);
    expect(fileInput.length).toBe(1);
  });
});
