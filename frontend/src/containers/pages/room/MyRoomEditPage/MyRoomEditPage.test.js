/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import MyRoomEditPage from './MyRoomEditPage';

describe('<MyRoomEditPage />', () => {
    let component;
    const mockStore = configureMockStore();
    const store = mockStore({
      auth: { auth: null, authError: null },
    });
    beforeEach(() => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MyRoomEditPage />
                </BrowserRouter>
            </Provider>
        );
    });
    it('should render well', () => {
        const wrapper = component.find('MyRoomRegister');
        expect(wrapper.length).toBe(1);
    })
})