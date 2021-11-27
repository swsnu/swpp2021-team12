/* eslint-disable no-undef */

import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MeetingCreatePage from './MeetingCreatePage';

jest.mock('axios');
const runAllPromises = () => new Promise(setImmediate);
describe('<MeetingCreatePage />', () => {
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
          <MeetingCreatePage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('MeetingCreatePage');
    expect(wrapper.length).toBe(1);
    const backButton = component.find('#back-button').find('button');
    backButton.simulate('click');
  });

  it('sholud handle onClickConfirmHandler well', async () => {
    const pauseFor = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { id: 10 },
      }),
    );
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    axios.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );

    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingCreatePage />
        </BrowserRouter>
      </Provider>,
    );
    await runAllPromises();
    await pauseFor(50);
    const confirmButton = component.find('#confirm-button').find('button');
    confirmButton.simulate('click');

    const fileInput = component.find('#input_file').find('input');
    fileInput.simulate('change', {
      target: {
        files: [new Blob([new ArrayBuffer('data')], { type: 'image/png' })],
      },
    });
    await pauseFor(500);
    confirmButton.simulate('click');
    await runAllPromises();
    const photoDeleteButton = component.find('#button_delete').find('button');
    photoDeleteButton.simulate('click');
    confirmButton.simulate('click');
  });
});
