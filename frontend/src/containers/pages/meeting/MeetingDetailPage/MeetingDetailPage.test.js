/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import MeetingDetailPage from './MeetingDetailPage';

describe('<MeetingDetailPage />', () => {
  const stubMeetings = [
    {
      id: 1,
      title: 'tt',
      content: 'tc',
      authorId: 1,
      currentMembers: [1, 2],
      maxMembers: 4,
    },
  ];
  const stubUsers = [
    { id: 1, name: 'tester' },
    { id: 2, name: 'tester2' },
    { id: 3, name: 'tester3' },
  ];
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: { id: 1 }, users: stubUsers },
    meetings: { meetings: stubMeetings },
  });
  const store2 = mockStore({
    auth: { auth: { id: 2 }, users: stubUsers },
    meetings: { meetings: stubMeetings },
  });
  const store3 = mockStore({
    auth: { auth: { id: 3 }, users: stubUsers },
    meetings: { meetings: stubMeetings },
  });
  let component;
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should render without error', () => {
    const pageTem = component.find('PageTemplate');
    expect(pageTem.length).toBe(1);
  });

  it('should have buttons working(author)', () => {
    const meetingAuthorButton = component.find('#meetingAuthor');
    const editMeetingButton = component.find('.EditButton');
    const deleteMeetingButton = component.find('.DeleteButton');
    const backButton = component.find('.BackButton');
    meetingAuthorButton.simulate('click');
    editMeetingButton.simulate('click');
    deleteMeetingButton.simulate('click');
    backButton.simulate('click');
    expect(meetingAuthorButton.length).toBe(1);
    expect(editMeetingButton.length).toBe(1);
    expect(deleteMeetingButton.length).toBe(1);
    expect(backButton.length).toBe(1);
  });

  it('should have buttons working(participant)', () => {
    component = mount(
      <Provider store={store2}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    const quitMeetingButton = component.find('.QuitButton');
    quitMeetingButton.simulate('click');
    expect(quitMeetingButton.length).toBe(1);
  });

  it('should have buttons working(non-participant)', () => {
    component = mount(
      <Provider store={store3}>
        <BrowserRouter>
          <MeetingDetailPage match={{ params: { id: 1 } }} />
        </BrowserRouter>
      </Provider>,
    );
    const joinMeetingButton = component.find('.JoinButton');
    joinMeetingButton.simulate('click');
    expect(joinMeetingButton.length).toBe(1);
  });
});
