/* eslint-disable no-undef */

import React from "react";
import { mount } from "enzyme";
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import MeetingCreatePage from "./MeetingCreatePage";

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
        const spyClickConfirmHandler = jest.fn();
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MeetingCreatePage onClickConfirmHandler={spyClickConfirmHandler}/>
                </BrowserRouter>
            </Provider>
        );
        const titleInput = component.find('#meeting-title-input').find('input');
        titleInput.simulate('change', { target: { value: 'title' } });
        const contentInput = component.find('#meeting-content-input').find('textarea');
        contentInput.simulate('change', { target: { value: 'content'} });
        const maxMembersInput = component.find('#meeting-max-members-input').find('input');
        maxMembersInput.simulate('change', { target: { value: 9} });
        const submit = component.find('#meeting-create-form').find('Form');
        submit.simulate('submit');
        expect(spyClickConfirmHandler).toHaveBeenCalledTimes(0);
    })
})