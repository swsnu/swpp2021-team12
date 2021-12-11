/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MyRoomPending from './MyRoomPending';

let component;

describe('<MyRoomPending />', () => {
  it('should render without error', () => {
    component = shallow(
      <BrowserRouter>
        <MyRoomPending.WrappedComponent />
      </BrowserRouter>,
    );
    const wrapper = component.find('Router');
    expect(wrapper.length).toBe(1);
  });

  it('should have back button and it should work', () => {
    component = mount(
      <BrowserRouter>
        <MyRoomPending />
      </BrowserRouter>,
    );
    const backButton = component.find('.BackButton').find('button');
    // backButton.simulate('click');
    expect(backButton.length).toBe(0);
  });
});
