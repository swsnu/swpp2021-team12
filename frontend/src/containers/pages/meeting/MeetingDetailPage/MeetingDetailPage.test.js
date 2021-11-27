/* eslint-disable react/display-name */
/* eslint-disable arrow-body-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MeetingDetailPage from './MeetingDetailPage';

jest.mock('axios');
const runAllPromises = () => new Promise(setImmediate);
describe('<MeetingDetailPage />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: 1 },
  });

  let component;
  beforeEach(() => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: 1,
          author: {
            id: 1,
            name: 'name 1',
            self_intro: 'self 1',
          },
          title: 'title 1',
          content: 'content 1',
          currentMembers: [
            {
              id: 1,
              name: 'name 1',
              self_intro: 'self 1',
            },
            {
              id: 2,
              name: 'name 2',
              self_intro: 'self 2',
            },
          ],
        },
      }),
    );
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            content: 'content 1',
            author: {
              id: 1,
              name: 'name 1',
              self_intro: 'self 1',
            },
          },
          {
            id: 2,
            content: 'content 2',
            author: {
              id: 2,
              name: 'name 2',
              self_intro: 'self 2',
            },
          },
        ],
      }),
    );
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    axios.put.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should render without error', () => {
    const pageTem = component.find('PageTemplate');
    expect(pageTem.length).toBe(1);
  });

  it('should throw error with wrong fetch', () => {
    const spyAlert = jest.spyOn(window, 'alert');
    axios.get.mockImplementationOnce(() => Promise.reject());
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    expect(spyAlert).toHaveBeenCalledTimes(0);
  });

});
