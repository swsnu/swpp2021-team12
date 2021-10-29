/* eslint-disable no-undef */

import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import MeetingCreate from './MeetingCreate';

describe('<MeetingCreate />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <MeetingCreate />
            </BrowserRouter>
        )
    });
    it('should render without error', () => {
        const wrapper = component.find('.MeetingEdit');
        expect(wrapper.length).toBe(1);
    });
});