/* eslint-disable no-undef */
import React from 'react';
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
      meetings: { meetings: [{ title: 'title', content: 'content', maxMembers: 10, id: 0 }]}
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
        const submit = component.find('#my-room-register-form').find('Form');
        submit.simulate('submit');
        expect(submit.length).toBe(1);
    })
})