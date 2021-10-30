/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MeetingList from './MeetingList';

let component;

describe('<MeetingList />', () => {
  it('should render without error', () => {
    component = shallow(
      <BrowserRouter>
        <MeetingList.WrappedComponent />
      </BrowserRouter>,
    );
    const wrapper = component.find('Router');
    expect(wrapper.length).toBe(1);
  });

  it('should have filter button and it should work', () => {
    component = mount(
      <BrowserRouter>
        <MeetingList />
      </BrowserRouter>,
    );
    const filterButton = component.find('.filterButton').find('button');
    filterButton.simulate('click');
    expect(filterButton.length).toBe(1);
  });

  it('should show proper buttons when the modal is open', () => {
    component = mount(
      <BrowserRouter>
        <MeetingList />
      </BrowserRouter>,
    );
    const filterButton = component.find('.filterButton').find('button');
    filterButton.simulate('click');
    const locationButton = component.find('.location').find('button');
    const timeButton = component.find('.time').find('button');
    const tagButton = component.find('.tag').find('button');
    const backButton = component.find('.back').find('button');
    const confirmButton = component.find('.confirm').find('button');
    locationButton.simulate('click');
    timeButton.simulate('click');
    tagButton.simulate('click');
    backButton.simulate('click');
    confirmButton.simulate('click');
    expect(locationButton.length).toBe(1);
    expect(timeButton.length).toBe(1);
    expect(tagButton.length).toBe(1);
    expect(backButton.length).toBe(1);
    expect(confirmButton.length).toBe(1);
  });

  it('should have back button and it should work', () => {
    component = mount(
      <BrowserRouter>
        <MeetingList />
      </BrowserRouter>,
    );
    const backButton = component.find('.BackButton').find('button');
    backButton.simulate('click');
    expect(backButton.length).toBe(1);
  });

  it('should redirect to detail page when the title is clicked', () => {
    const historyMock = { push: jest.fn() };
    component = mount(
      <BrowserRouter>
        <MeetingList
          meetinglist={[{ id: 1, meetingName: 'test' }]}
          history={historyMock}
        />
      </BrowserRouter>,
    );
    const titleButton = component.find('.meetingName').find('button');
    titleButton.simulate('click');
    expect(titleButton.length).toBe(1);
  });
});
