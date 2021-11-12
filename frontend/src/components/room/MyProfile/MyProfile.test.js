/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MyProfile from './MyProfile';

describe('<MyProfile />', () => {
  it('should have edit button', () => {
    const historyMock = { push: jest.fn() };
    const component = mount(
      <BrowserRouter>
        <MyProfile
          profile={{ name: 'name', email: 'email', selfIntro: 'intro' }}
          profileImage={'fakeimage'}
          history={historyMock}
        />
      </BrowserRouter>,
    );
    const editButton = component.find('#button_edit').find('button');
    editButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });
});
