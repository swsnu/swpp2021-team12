/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import MyRoomPage from './MyRoomPage';

describe('<MyRoomPage />', () => {
    let component;
    const mockStore = configureMockStore();
    const store = mockStore({
        auth: { auth: null, authError: null },
    });
    beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue({data: {title: "title", description:"des", capacity: 10, dates: ["2021-11-25"]}});
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <MyRoomPage />
                </BrowserRouter>
            </Provider>
        );
    });
    it('should render well', () => {
        const wrapper = component.find('NoRoom')
        expect(wrapper.length).toBe(1);
    });
    it('should delete well', () => {
        axios.delete = jest.fn().mockResolvedValue();
        const deleteButton = component.find('#my-room-delete-button').find('button');
        deleteButton.simulate('click');
        expect(axios.delete).toHaveBeenCalledTimes(1);
    })
})