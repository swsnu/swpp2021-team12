/* eslint-disable no-undef */

import React from "react";
import axios from 'axios';
import { mount } from "enzyme";
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import MeetingEditPage from "./MeetingEditPage";

jest.mock('axios');

describe('<MeetingEditPage />', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
    meetings: { meetings: [{ title: 'title', content: 'content', maxMembers: 10, id: 0 }]}
  });
    let component;
    beforeEach(() => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MeetingEditPage match={{ params: {id: 0} }}/>
                </BrowserRouter>
            </Provider>
        );
    });

    it('should render without error', () => {
        const wrapper = component.find('MeetingEditPage');
        expect(wrapper.length).toBe(1);
    })
    xit('sholud handle onClickConfirmHandler well', () => {
        axios.get.mockImplementation(() => Promise.resolve({meeting: { title:'title', content: 'content', maxMembers: 10}}))
        axios.put.mockImplementation((url, data) => Promise.resolve(data));
        const titleInput = component.find('#meeting-title-input').find('input');
        titleInput.simulate('change', { target: { value: 'edited title' } });
        const contentInput = component.find('#meeting-content-input').find('textarea');
        contentInput.simulate('change', { target: { value: 'edited content'} });
        const maxMembersInput = component.find('#meeting-max-members-input').find('input');
        maxMembersInput.simulate('change', { target: { value: 9} });
        /*
        const submit = component.find('#meeting-edit-form').find('Form');
        submit.simulate('submit');
        */
        component.update();
        const confirmButton = component.find('#confirm-button').find('button');
        confirmButton.simulate('click');
        expect(axios.put).toHaveBeenCalledTimes(1);
    });
})