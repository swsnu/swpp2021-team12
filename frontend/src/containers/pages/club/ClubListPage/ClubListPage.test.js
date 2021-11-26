/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import ClubListPage from './ClubListPage';

// const runAllPromises = () => new Promise(setImmediate);
jest.mock('axios');
describe('<ClubListPage />', () => {
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
            title: 'test title',
            content: 'test content',
            author: {
              id: 1,
              name: 'name1',
              self_intro: 'self1',
            },
            members: [
              {
                id: 2,
                name: 'name2',
                self_intro: 'self2',
              },
            ],
          },
          {
            title: 'test title',
            content: 'test content',
            author: {
              id: 2,
              name: 'name2',
              self_intro: 'self2',
            },
            members: [
              {
                id: 1,
                name: 'name1',
                self_intro: 'self1',
              },
            ],
          },
        ],
      }),
    );
    axios.delete.mockImplementation(() => Promise.resolve({}));
    axios.put.mockImplementation(() => Promise.resolve({}));
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ClubListPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.ClubListPage');
    expect(wrapper.length).toBe(1);
  });

  it('should have buttons working', () => {
    const historyMock = { push: jest.fn() };
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ClubListPage history={historyMock} />
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

  // it('should handle onClickDeleteButton', () => {
  //   const deleteButton = component.find('#deleteClubButton').find('button');
  //   deleteButton.simulate('click');
  //   expect(axios.delete).toHaveBeenCalledTimes(1);
  // });
});
