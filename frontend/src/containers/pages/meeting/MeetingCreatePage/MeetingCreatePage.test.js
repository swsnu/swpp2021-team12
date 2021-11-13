/* eslint-disable no-undef */

import React from "react";
import axios from 'axios';
import { mount } from "enzyme";
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import MeetingCreatePage from "./MeetingCreatePage";

jest.mock('axios');

describe('<MeetingCreatePage />', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockStore = configureMockStore();
  const store = mockStore({
    auth: { auth: null, authError: null },
  });
    let component;
    beforeEach(() => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MeetingCreatePage />
                </BrowserRouter>
            </Provider>
        );
    });

    it('should render without error', () => {
        const wrapper = component.find('MeetingCreatePage');
        expect(wrapper.length).toBe(1);
    })
    it('sholud handle onClickConfirmHandler well', () => {
        axios.post.mockImplementation((url, data) => Promise.resolve(data))
        const titleInput = component.find('#meeting-title-input').find('input');
        titleInput.simulate('change', { target: { value: 'title' } });
        const contentInput = component.find('#meeting-content-input').find('textarea');
        contentInput.simulate('change', { target: { value: 'content'} });
        const maxMembersInput = component.find('#meeting-max-members-input').find('input');
        maxMembersInput.simulate('change', { target: { value: 9} });
        /*  changed submit -> onClick
        const submit = component.find('#meeting-create-form').find('Form');
        submit.simulate('submit');
        */
        const confirmButton = component.find('#confirm-button').find('button');
        confirmButton.simulate('click');
        expect(axios.post).toHaveBeenCalledTimes(1);
    })
})