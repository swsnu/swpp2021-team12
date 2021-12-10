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

  // it('should show proper buttons when the modal is open', () => {
  //   component = mount(
  //     <BrowserRouter>
  //       <MeetingList />
  //     </BrowserRouter>,
  //   );
  //   // const filterButton = component.find('.filterButton').find('button');
  //   // filterButton.simulate('click');
  //   const locationButton = component.find('#location_button').find('button');
  //   const timeButton = component.find('#time-button').find('button');
  //   const backButton = component.find('.back').find('button');
  //   const confirmButton = component.find('.confirm').find('button');
  //   locationButton.simulate('click');
  //   timeButton.simulate('click');
  //   backButton.simulate('click');
  //   confirmButton.simulate('click');
  //   expect(locationButton.length).toBe(1);
  //   expect(timeButton.length).toBe(1);
  //   expect(backButton.length).toBe(1);
  //   expect(confirmButton.length).toBe(1);
  // });

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

  xit('should redirect to detail page when the detail button is clicked', () => {
    const historyMock = { push: jest.fn() };
    component = mount(
      <BrowserRouter>
        <MeetingList
          currentUser={1}
          meetinglist={[
            {
              id: 1,
              author: { id: 1 },
              is_public: true,
              accessible_members: [1],
            },
          ]}
          history={historyMock}
        />
      </BrowserRouter>,
    );
    const detailButton = component.find('.detailButton').find('button');
    detailButton.simulate('click');
    expect(detailButton.length).toBe(1);
  });
});
