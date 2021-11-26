/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import RoomDetail from './RoomDetail';

describe('<RoomDetail />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <RoomDetail room={{title:"title", description:"des", capacity:10, dates:["2021-11-25"]}}/>
            </BrowserRouter>
        )
    });

    it('should render without error', () => {
        const wrapper = component.find('#room-detail').find('Container');
        expect(wrapper.length).toBe(3);
    })

    it('click back button', () => {
        const backButton = component.find('#room-detail-back-button').find('button');
        backButton.simulate('click');
        expect(backButton.length).toBe(1);
    })
})