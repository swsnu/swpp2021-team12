/* eslint-disable no-undef */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import MeetingEdit from './MeetingEdit';

describe('<MeetingEdit />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <MeetingEdit
          meeting={{
            meeting: { title: 'title', content: 'content', maxMembers: 10 },
          }}
        />
      </BrowserRouter>,
    );
  });
  it('should render without error', () => {
    const wrapper = component.find('.MeetingEdit');
    expect(wrapper.length).toBe(1);
  });
  it('should edit properly when confirm button clicked', () => {
    const spyCreateMeeting = jest.fn();
    component = mount(
      <BrowserRouter>
        <MeetingEdit
          meeting={{ title: 'title', content: 'content', maxMembers: 10 }}
          onClickConfirmHandler={spyCreateMeeting}
          user={{ user: 1 }}
        />
      </BrowserRouter>,
    );
    const titleInput = component.find('#meeting-title-input').find('input');
    titleInput.simulate('change', { target: { value: 'edited title' } });
    const contentInput = component
      .find('#meeting-content-input')
      .find('textarea');
    contentInput.simulate('change', { target: { value: 'edited content' } });
    const maxMembersInput = component
      .find('#meeting-max-members-input')
      .find('input');
    maxMembersInput.simulate('change', { target: { value: 9 } });
    const submit = component.find('#meeting-edit-form').find('Form');
    submit.simulate('submit');
    expect(spyCreateMeeting).toHaveBeenCalledTimes(1);
  });
  it('should go back properly', () => {
    let spyConfirm = jest
      .spyOn(window, 'confirm')
      .mockImplementation(() => true);
    const backButton = component.find('#back-button').find('button');
    backButton.simulate('click');
    const titleInput = component.find('#meeting-title-input').find('input');
    titleInput.simulate('change', { target: { value: 'edited title' } });
    const contentInput = component
      .find('#meeting-content-input')
      .find('textarea');
    contentInput.simulate('change', { target: { value: 'edited content' } });
    const maxMembersInput = component
      .find('#meeting-max-members-input')
      .find('input');
    maxMembersInput.simulate('change', { target: { value: 9 } });
    backButton.simulate('click');
    spyConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => false);
    backButton.simulate('click');
    expect(spyConfirm).toHaveBeenCalledTimes(2);
  });
});