/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './MainPage';

describe('<MainPage/>', () => {
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
          <MainPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('should render without error', () => {
    const pageTem = component.find('MainPage');
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(pageTem.length).toBe(1);
  });

  it('should stay page when logged in', () => {
    const authStore = mockStore({
      auth: { auth: { type: 'signin' }, authError: null },
    });
    component = mount(
      <Provider store={authStore}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>,
    );
    const pageTem = component.find('MainPage');
    expect(pageTem.length).toBe(1);
  });

  it('should have buttons working', () => {
    const historyMock = { push: jest.fn() };
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage history={historyMock} />
        </BrowserRouter>
      </Provider>,
    );
    const mypageButton = component.find('#button_mypage').find('button');
    const signoutButton = component.find('#button_signout').find('button');
    const meetingListButton = component.find('#item_meetinglist').find('i');
    meetingListButton.simulate('click');
    mypageButton.simulate('click');
    signoutButton.simulate('click');
    expect(mypageButton.length).toBe(1);
    expect(signoutButton.length).toBe(1);
    expect(historyMock.push).toHaveBeenCalledTimes(1);
  });
});
