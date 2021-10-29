/* eslint-disable no-undef */

import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import MeetingEdit from './MeetingEdit';

describe('<MeetingEdit />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <MeetingEdit />
            </BrowserRouter>
        )
    });
    it('should render without error', () => {
        const wrapper = component.find('.MeetingEdit');
        expect(wrapper.length).toBe(1);
    });
    
});