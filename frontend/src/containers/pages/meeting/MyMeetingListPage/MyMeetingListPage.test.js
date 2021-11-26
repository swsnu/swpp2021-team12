/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import MyMeetingListPage from './MyMeetingListPage';

jest.mock('axios');
describe('<MyMeetingListPage />', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: 1 },
  });
  let component;

  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            author: {
              id: 1,
            },
            title: 'title 1',
          },
          {
            id: 2,
            author: {
              id: 2,
            },
            title: 'title 2',
          },
        ],
      }),
    );
    axios.delete.mockImplementation(() => Promise.resolve({}));
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyMeetingListPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.MyMeetingListPage');
    expect(wrapper.length).toBe(1);
  });

  it('should have buttons working', () => {
    const historyMock = { push: jest.fn() };
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyMeetingListPage
            match={{ params: { id: 1 } }}
            history={historyMock}
          />
        </BrowserRouter>
      </Provider>,
    );
    const meetingListButton = component.find('#item_meetinglist').find('i');
    const mymeetingButton = component.find('#mymeeting-item').find('i');
    const myclublistButton = component.find('#myclublist-item').find('i');
    meetingListButton.simulate('click');
    mymeetingButton.simulate('click');
    myclublistButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledTimes(3);
  });
});
