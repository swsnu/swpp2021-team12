/* eslint-disable no-undef */

import React from 'react';
import * as axios from 'axios';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import MeetingEditPage from './MeetingEditPage';

jest.mock('axios');
const runAllPromises = () => new Promise(setImmediate);
describe('<MeetingEditPage />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
  let component;
  beforeEach(async () => {
    axios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: { title: 'title', content: 'content', maxMembers: 10 },
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {},
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              title: 'test title',
              content: 'test content',
              author: {
                id: 1,
                name: 'name1',
                email: 'email1',
                self_intro: 'self1',
              },
              members: [
                {
                  id: 2,
                  name: 'name2',
                  email: 'email2',
                  self_intro: 'self2',
                },
              ],
              pendings: [],
            },
          ],
        }),
      );
    // axios.get.mockImplementation(() =>
    //   Promise.resolve({
    //     data: { title: 'title', content: 'content', maxMembers: 10 },
    //   }),
    // );
    // axios.get.mockImplementation(() =>
    //   Promise.resolve({
    //     data: [
    //       {
    //         title: 'test title',
    //         content: 'test content',
    //         author: {
    //           id: 1,
    //           name: 'name1',
    //           email: 'email1',
    //           self_intro: 'self1',
    //         },
    //         members: [
    //           {
    //             id: 2,
    //             name: 'name2',
    //             email: 'email2',
    //             self_intro: 'self2',
    //           },
    //         ],
    //         pendings: [],
    //       },
    //     ],
    //   }),
    // );
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingEditPage match={{ params: { id: 10 } }} />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('MeetingEditPage');
    expect(wrapper.length).toBe(1);
    const backButton = component.find('#back-button').find('button');
    backButton.simulate('click');
  });

  xit('should get meeting and render', async () => {
    const pauseFor = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          title: 'title',
          content: 'content',
          maxMembers: 10,
          location: { position: { lat: 1, lng: 1 }, description: 'ss' },
          description: 'tt',
          time: new Date(),
        },
      }),
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1 },
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
          <MeetingEditPage match={{ params: { id: '10' } }} />
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
    const photoDeleteButton = component.find('#button_delete').find('button');
    photoDeleteButton.simulate('click');
    confirmButton.simulate('click');
    expect(confirmButton.length).toBe(1);
  });

  it('should throw error with wrong axios.get', () => {
    window.alert = jest.fn();
    axios.get.mockImplementation(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({
        status: 400,
      }),
    );
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingEditPage match={{ params: { id: 0 } }} />
        </BrowserRouter>
      </Provider>,
    );
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
