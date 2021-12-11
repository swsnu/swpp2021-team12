/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as axios from 'axios';
import ClubEditPage from './ClubEditPage';

jest.mock('axios');
describe('<ClubEditPage/>', () => {
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
          <ClubEditPage
            match={{ params: 1 }}
            location={{
              state: {
                club: {
                  id: 1,
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
              },
            }}
          />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    expect(component.find('ClubEditPage').length).toBe(1);
  });

  it('should have buttons working', () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    const confirmButton = component.find('#confirm-button').find('button');
    const deleteButton = component.find('#delete-button').find('button');
    deleteButton.simulate('click');
    confirmButton.simulate('click');
    axios.put.mockImplementation(() =>
      Promise.reject({
        status: 400,
      }),
    );
    axios.delete.mockImplementation(() =>
      Promise.reject({
        status: 400,
      }),
    );
    deleteButton.simulate('click');
    confirmButton.simulate('click');
    expect(axios.put).toHaveBeenCalledTimes(2);
    expect(axios.delete).toHaveBeenCalledTimes(2);
  });
});
