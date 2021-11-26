/* eslint-disable no-undef */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MeetingTime from './MeetingTime';

describe('<MeetingTime />', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <MeetingTime timeHandler={jest.fn()} time={11} />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('MeetingTime');
    expect(wrapper.length).toBe(1);
  });

  it('should handle modal', () => {
    const timeButton = component.find('#time-button').find('button');

    timeButton.simulate('click');
    const timepicker = component
      .find('.MuiButtonBase-root')
      .find('button')
      .at(10);

    const backButton = component.find('#back-button').find('button');
    timepicker.simulate('click');
    backButton.simulate('click');
    expect(timeButton.length).toBe(1);
  });
});
