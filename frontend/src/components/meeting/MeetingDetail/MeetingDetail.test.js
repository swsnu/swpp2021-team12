/* eslint-disable no-undef */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MeetingDetail from './MeetingDetail';

describe('<MeetingDetail />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <MeetingDetail
          currentUser={1}
          meetingDetail={{
            meetingData: {
              id: 1,
              title: 'tt',
              content: 'tc',
              authorId: 1,
              currentMembers: [1, 2],
              maxMembers: 4,
            },
            author: {
              name: 'tn',
            },
            members: [{ name: 'tn' }, { name: 'tn2' }],
          }}
        />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('.MeetingDetail');
    expect(wrapper.length).toBe(1);
  });

  it('should handle delete button', () => {
    const spyDeleteMeeting = jest.fn();
    component = mount(
      <BrowserRouter>
        <MeetingDetail
          currentUser={1}
          meetingDetail={{
            meetingData: {
              id: 1,
              title: 'tt',
              content: 'tc',
              authorId: 1,
              currentMembers: [1, 2],
              maxMembers: 4,
            },
            author: {
              name: 'tn',
            },
            members: [{ name: 'tn' }, { name: 'tn2' }],
          }}
          onClickDeleteButton={spyDeleteMeeting}
        />
      </BrowserRouter>,
    );
    const deleteButton = component.find('#deleteMeetingButton').find('button');
    deleteButton.simulate('click');
    expect(spyDeleteMeeting).toHaveBeenCalledTimes(1);
  });

  it('should handle edit button', () => {
    const history = { push: jest.fn() };
    const pushSpy = jest.spyOn(history, 'push');
    component = mount(
      <BrowserRouter>
        <MeetingDetail
          currentUser={1}
          meetingDetail={{
            meetingData: {
              id: 1,
              title: 'tt',
              content: 'tc',
              authorId: 1,
              currentMembers: [1, 2],
              maxMembers: 4,
            },
            author: {
              name: 'tn',
            },
            members: [{ name: 'tn' }, { name: 'tn2' }],
          }}
        />
      </BrowserRouter>,
    );
    const editButton = component.find('#editMeetingButton').find('button');
    editButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle quit button', () => {
    const spyToggle = jest.fn();
    component = mount(
      <BrowserRouter>
        <MeetingDetail
          currentUser={2}
          meetingDetail={{
            meetingData: {
              id: 1,
              title: 'tt',
              content: 'tc',
              authorId: 1,
              currentMembers: [1, 2],
              maxMembers: 4,
            },
            author: {
              name: 'tn',
            },
            members: [{ name: 'tn' }, { name: 'tn2' }],
          }}
          onClickToggleButton={spyToggle}
        />
      </BrowserRouter>,
    );
    const quitButton = component.find('#quitMeetingButton').find('button');
    quitButton.simulate('click');
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });

  it('should handle join button', () => {
    const spyToggle = jest.fn();
    component = mount(
      <BrowserRouter>
        <MeetingDetail
          currentUser={3}
          meetingDetail={{
            meetingData: {
              id: 1,
              title: 'tt',
              content: 'tc',
              authorId: 1,
              currentMembers: [1, 2],
              maxMembers: 4,
            },
            author: {
              name: 'tn',
            },
            members: [{ name: 'tn' }, { name: 'tn2' }],
          }}
          onClickToggleButton={spyToggle}
        />
      </BrowserRouter>,
    );
    const joinButton = component.find('#joinMeetingButton').find('button');
    joinButton.simulate('click');
    expect(spyToggle).toHaveBeenCalledTimes(1);
  });

  it('should handle back button', () => {
    const history = { push: jest.fn() };
    const pushSpy = jest.spyOn(history, 'push');
    const backButton = component
      .find('#backDetailMeetingButton')
      .find('button');
    backButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledTimes(0);
  });
});
