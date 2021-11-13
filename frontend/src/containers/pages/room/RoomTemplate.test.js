/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RoomTemplate from './RoomTemplate';

describe('<RoomTemplate/>', () => {
  const mockStore = configureMockStore();
  // eslint-disable-next-line no-unused-vars
  let component;

  it('should handle logout sequence and error', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const store = mockStore({ auth: { auth: 1 } });
    localStorage.setItem('user', { id: 1 });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <RoomTemplate />
        </BrowserRouter>
      </Provider>,
    );

    localStorage.clear();
    const newstore = mockStore({
      auth: { auth: null, authError: 'error' },
    });
    component = mount(
      <Provider store={newstore}>
        <BrowserRouter>
          <RoomTemplate />
        </BrowserRouter>
      </Provider>,
    );

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('should have buttons working', () => {
    const store = mockStore({ auth: { auth: 1 } });
    const historyMock = { push: jest.fn() };
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <RoomTemplate history={historyMock} />
        </BrowserRouter>
      </Provider>,
    );
    const myprofileButton = component.find('#item_myprofile').find('a');
    const myroomButton = component.find('#item_myroom').find('a');
    myprofileButton.simulate('click');
    myroomButton.simulate('click');
    expect(myprofileButton.length).toBe(1);
    expect(myroomButton.length).toBe(1);
  });
});
