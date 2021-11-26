/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

import ClubSearchPage from './ClubSearchPage';

describe('<ClubSearchPage />', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
    auth: { auth: null, authError: null },
    });
    it('should render without error', () => {
        axios.get = jest.fn().mockResolvedValue({data:{
            clubList: [
            {id:0, title:"title0", content:"content0"},
            {id:1, title:"title1", content:"content1"}
        ]}});
        const component = mount(
        <Provider store={store}>
            <BrowserRouter>
                <ClubSearchPage />
            </BrowserRouter>
        </Provider>);
        const wrapper = component.find('ClubSearch');
        expect(wrapper.length).toBe(1);
    })
})