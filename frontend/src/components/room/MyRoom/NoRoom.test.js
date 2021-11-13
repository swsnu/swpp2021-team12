/* eslint-disable no-undef */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import NoRoom from './NoRoom';

describe('<NoRoom />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <NoRoom />
            </BrowserRouter>
        );
    });

    it('should render without error', () => {
        const wrapper = component.find('NoRoom');
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicking register button well', () => {
        const registerButton = component.find('#no-room-register-button').find('button');
        registerButton.simulate('click');
        expect(registerButton.length).toBe(1);
    });
})