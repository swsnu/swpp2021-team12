/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MyMeetingList from './MyMeetingList';

describe('<MyMeetingList />', () => {
  let component;
  const historyMock = { push: jest.fn() };
  const pushSpy = jest.spyOn(historyMock, 'push');
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <MyMeetingList
          currentUser={1}
          history={historyMock}
          myMeetingList={[
            {
              id: 1,
              author: {
                id: 1,
              },
              title: 'title 1',
            },
            {
              id: 2,
              author: {
                id: 2,
              },
              title: 'title 2',
            },
          ]}
        />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.MyMeetingList');
    expect(wrapper.length).toBe(1);
  });

  it('should handle back button', () => {
    const backButton = component.find('.BackButton').find('button');
    backButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should move to detail page', () => {
    const backButton = component.find('.meetingName').first().find('button');
    backButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
