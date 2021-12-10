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
          meetingDetailData={{
            id: 1,
            author: {
              id: 1,
              name: 'name 1',
              email: 'email 1',
              self_intro: 'self 1',
            },
            title: 'title 1',
            content: 'content 1',
            currentMembers: [
              {
                id: 2,
                name: 'name 2',
                email: 'email 2',
                self_intro: 'self 2',
              },
            ],
            location: {
              position: {
                lat: 50.0,
                lng: 50.0,
              },
              descriptions: 'description',
            },
            is_public: true,
            accessible_members: [1],
            accessible_clubs: [],
          }}
          meetingPhoto={'photo'}
          commentList={jest.fn()}
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
          meetingDetailData={{
            id: 1,
            author: {
              id: 1,
              name: 'name 1',
              email: 'email 1',
              self_intro: 'self 1',
            },
            title: 'title 1',
            content: 'content 1',
            currentMembers: [
              {
                id: 2,
                name: 'name 2',
                email: 'email 2',
                self_intro: 'self 2',
              },
            ],
            location: {
              position: {
                lat: 50.0,
                lng: 50.0,
              },
              descriptions: 'description',
            },
            is_public: true,
            accessible_members: [1],
            accessible_clubs: [],
          }}
          meetingPhoto={'photo'}
          commentList={jest.fn()}
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
          meetingDetailData={{
            id: 1,
            author: {
              id: 1,
              name: 'name 1',
              email: 'email 1',
              self_intro: 'self 1',
            },
            title: 'title 1',
            content: 'content 1',
            currentMembers: [
              {
                id: 2,
                name: 'name 2',
                email: 'email 2',
                self_intro: 'self 2',
              },
            ],
            location: {
              position: {
                lat: 50.0,
                lng: 50.0,
              },
              descriptions: 'description',
            },
            is_public: true,
            accessible_members: [1],
            accessible_clubs: [],
          }}
          meetingPhoto={'photo'}
          commentList={jest.fn()}
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
          meetingDetailData={{
            id: 1,
            author: {
              id: 1,
              name: 'name 1',
              email: 'email 1',
              self_intro: 'self 1',
            },
            title: 'title 1',
            content: 'content 1',
            currentMembers: [
              {
                id: 2,
                name: 'name 2',
                email: 'email 2',
                self_intro: 'self 2',
              },
            ],
            location: {
              position: {
                lat: 50.0,
                lng: 50.0,
              },
              descriptions: 'description',
            },
            is_public: true,
            accessible_members: [1],
            accessible_clubs: [],
          }}
          meetingPhoto={'photo'}
          commentList={jest.fn()}
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
