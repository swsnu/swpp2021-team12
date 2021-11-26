/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import MyRoomRegisterPage from './MyRoomRegisterPage';

describe('<MyRoomRegisterPage />', () => {
    let component;
    const mockStore = configureMockStore();
    const store = mockStore({
        auth: { auth: null, authError: null },
    });
    beforeEach(() => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MyRoomRegisterPage />
                </BrowserRouter>
            </Provider>
        )
    })
    it('should render well', () => {
        const wrapper = component.find('MyRoomRegister');
        expect(wrapper.length).toBe(1);
    })
    it('should handle comfirm', () => {
        axios.post = jest.fn().mockResolvedValue({data:{}});
        const confirm = component.find('#my-room-register-confirm-button').find('button');
        confirm.simulate('click');
        expect(confirm.length).toBe(1);
    })
})