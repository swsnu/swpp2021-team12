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
  });

  it('sholud handle onClickConfirmHandler well', async () => {
    const pauseFor = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));
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
    const stubInitialState = ['stub data'];
    const realUseState = React.useState;
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() =>
        realUseState([
          new Blob([new ArrayBuffer('data')], { type: 'image/png' }),
        ]),
      )
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(0));

    /* const titleInput = component.find('#meeting-title-input').find('input');
    const fileInput = component.find('#input_file').find('input');
    const locationButton = component.find('#location_button').find('button');
    const mapInput = component.find('#location').find('Component');
    const marker = component.find('#clickedMarker');
    titleInput.simulate('change', { target: { value: 'title' } });
    const contentInput = component
      .find('#meeting-content-input')
      .find('textarea');
    contentInput.simulate('change', { target: { value: 'content' } });
    const maxMembersInput = component
      .find('#meeting-max-members-input')
      .find('input');
    maxMembersInput.simulate('change', { target: { value: 9 } });
    locationButton.simulate('click');
    console.log(component.debug());
    mapInput.simulate('click');
    marker.simulate('click');
    await runAllPromises();
    component.update();
    const pauseFor = (milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds));
    fileInput.simulate('change', {
      target: {
        files: [new Blob([new ArrayBuffer('data')], { type: 'image/png' })],
      },
    });
    await pauseFor(500); */
    const confirmButton = component.find('#confirm-button').find('button');
    console.log(component.debug());
    await pauseFor(50);
    confirmButton.simulate('click');
    await runAllPromises();
    component.update();

    await pauseFor(500);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
