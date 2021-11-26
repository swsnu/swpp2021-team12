/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

import RoomDetailPage from './RoomDetailPage';

describe('<RoomDetailPage />', () => {
    window.alert = () => {};
    const mockStore = configureMockStore();
    const store = mockStore({
    auth: { auth: null, authError: null },
    });
    let component;
    beforeEach(() => {
        axios.get = jest.fn().mockResolvedValue({data:{id:0, title:"title", content:"content"}});
        axios.post = jest.fn().mockResolvedValue();
        axios.put = jest.fn().mockResolvedValue();
        axios.delete = jest.fn().mockResolvedValue();
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <RoomDetailPage match={{params:{id:0}}}/>
                </BrowserRouter>
            </Provider>
        );
    });

    it('should render without error', () => {
        const wrapper = component.find('RoomTemplate');
        expect(wrapper.length).toBe(1);
    });
})