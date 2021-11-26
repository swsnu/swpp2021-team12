/* eslint-disable no-undef */

import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import MeetingCreate from './MeetingCreate';

describe('<MeetingCreate />', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <MeetingCreate />
            </BrowserRouter>
        )
    });
    it('should render without error', () => {
        const wrapper = component.find('.MeetingCreate');
        expect(wrapper.length).toBe(1);
    });
    it('should post properly when confirm button clicked', () => {
        const spyCreateMeeting = jest.fn();
        component = mount(
            <BrowserRouter>
                <MeetingCreate onClickConfirmHandler={spyCreateMeeting} user={{user: 1}}/>
            </BrowserRouter>
        );
        const titleInput = component.find('#meeting-title-input').find('input');
        titleInput.simulate('change', { target: { value: 'title' } });
        const contentInput = component.find('#meeting-content-input').find('textarea');
        contentInput.simulate('change', { target: { value: 'content'} });
        const maxMembersInput = component.find('#meeting-max-members-input').find('input');
        maxMembersInput.simulate('change', { target: { value: 9} });
        /*  change submit -> onClick
        const submit = component.find('#meeting-create-form').find('Form');
        submit.simulate('submit');
        expect(spyCreateMeeting).toHaveBeenCalledTimes(1);
        */
        const confirmButton = component.find('#confirm-button').find('button');
        confirmButton.simulate('click');
        expect(spyCreateMeeting).toHaveBeenCalledTimes(1);
    });
    it('should go back properly when back button clicked', () => {
        const backButton = component.find('#back-button').find('button');
        backButton.simulate('click');
        expect(backButton.length).toBe(1);
    })
});