/* eslint-disable no-undef */

import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import MyRoom from './MyRoom';

describe('<MyRoom />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <MyRoom room={{title: 'title', description: 'des', capacity: 10}} />
            </BrowserRouter>
        );
    })

    it('should render MyRoom well', () => {
       const myroom = component
            .find('MyRoom')
        expect(myroom.length).toBe(1)
    });

    it('should handle edit button without error', () => {
        const editButton = component
            .find('#my-room-edit-button')
            .find('button')
        editButton.simulate('click')
        expect(editButton.length).toBe(1)
    });
})