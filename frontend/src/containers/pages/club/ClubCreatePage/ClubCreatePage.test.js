/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as axios from 'axios';
import ClubCreatePage from './ClubCreatePage';

jest.mock('axios');
describe('<ClubCreatePage/>', () => {
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
          <ClubCreatePage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    expect(component.find('ClubCreatePage').length).toBe(1);
  });

  it('should have buttons working', async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        status: 200,
      }),
    );
    const titleInput = component.find('#club-title-input').find('input');
    const contentInput = component.find('#club-content-input').find('textarea');
    const confirmButton = component.find('#confirm-button').find('button');
    titleInput.simulate('change', { targer: { value: 'fadf' } });
    contentInput.simulate('change', { target: { value: 'dsdfs' } });
    titleInput.instance().value = 'title';
    contentInput.instance().value = 'content';
    titleInput.simulate('change');
    contentInput.simulate('change');
    confirmButton.simulate('click');
    axios.post.mockImplementation(() =>
      Promise.reject({
        status: 400,
      }),
    );
    confirmButton.simulate('click');
    expect(axios.post).toHaveBeenCalledTimes(2);
  });
});
