/* eslint-disable no-undef */

import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import * as axios from 'axios';

import MyRoomRegister from "./MyRoomRegister";

const spyCreate = jest.spyOn(axios, 'post').mockImplementation(() => {})
let spyConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => true)

const defaultProps = {
    onClickConfirmHandler: spyCreate,
}

describe('<MyRoomRegister />', () => {
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <MyRoomRegister {...defaultProps} />
            </BrowserRouter>
        )
    })

    it('should render without error', () => {
        const wrapper = component.find('MyRoomRegister');
        expect(wrapper.length).toBe(1);
    });

    it('should post room well', () => {
        const titleInput = component.find('#my-room-register-title-input').find('input');
        titleInput.simulate('change', {target: { value: 'title'}});
        const desInput = component.find('#my-room-register-description-input').find('textarea');
        desInput.simulate('change', {target: { value: 'des'}});
        const capacityInput = component.find('#my-room-register-capacity-input').find('input');
        capacityInput.simulate('change', {target: {value: 5}});
        const confirm = component.find('#confirm-button').find('button')
        confirm.simulate('click');
        expect(spyCreate).toHaveBeenCalledTimes(1);
    });

    it('should handle back button well', () => {
        let backButton = component.find('#my-room-register-back-button').find('button');
        backButton.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(0);

        const spyProps = {
            onClickConfirmHandler: spyCreate,
            room: {title: 'title', description:'des', capacity: 5}
        }
        const newComponent = mount(
            <BrowserRouter>
                <MyRoomRegister {...spyProps} />
            </BrowserRouter>
        );
        
        backButton = newComponent.find('#my-room-register-back-button').find('button');
        backButton.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(0);

        const titleInput = newComponent.find('#my-room-register-title-input').find('input');
        titleInput.simulate('change', {target: { value: 'changed'}});

        backButton.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(1);

        spyConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => false)
        backButton.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(2);
    })
})