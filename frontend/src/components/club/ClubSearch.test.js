/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import ClubSearch from './ClubSearch';

describe('<ClubSearch />', () => {
    const clubList = [
        {id:0, title:"title0", content:"content0"},
        {id:1, title:"title1", content:"content1"}
    ]
    let component;
    beforeEach(() => {
        component = mount(
            <BrowserRouter>
                <ClubSearch clubList={clubList}/>
            </BrowserRouter>
        );
    });

    it('should render without error', () => {
        const wrapper = component.find('#club-search').find('Container');
        expect(wrapper.length).toBe(1);
    })

    it('click search button', () => {
        const searchButton = component.find('#search-button').find('button');
        searchButton.simulate('click');
        expect(searchButton.length).toBe(1);
        const input = component.find('#search-input').find('input');
        input.simulate('change', {target: {value: "0"}});
        searchButton.simulate('click');
    })
})