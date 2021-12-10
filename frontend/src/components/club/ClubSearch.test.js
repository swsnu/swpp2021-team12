/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import ClubSearch from './ClubSearch';

describe('<ClubSearch />', () => {
  const clubList = [
    {
      id: 0,
      title: 'title0',
      content: 'content0',
      author: {
        id: 0,
        name: 'name0',
        email: 'email0',
        self_intro: 'si0',
      },
      members: [
        {
          id: 1,
          name: 'name1',
          email: 'email1',
          self_intro: 'si1',
        },
      ],
      pendings: [
        {
          id: 3,
          name: 'name3',
          email: 'email3',
          self_intro: 'si3',
        },
      ],
    },
    {
      id: 1,
      title: 'title1',
      content: 'content1',
      author: {
        id: 1,
        name: 'name1',
        email: 'email1',
        self_intro: 'si1',
      },
      members: [
        {
          id: 0,
          name: 'name0',
          email: 'email0',
          self_intro: 'si0',
        },
      ],
      pendings: [
        {
          id: 2,
          name: 'name2',
          email: 'email2',
          self_intro: 'si2',
        },
      ],
    },
  ];
  let component;
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <ClubSearch clubList={clubList} />
      </BrowserRouter>,
    );
  });

  it('should render without error', () => {
    const wrapper = component.find('#club-search').find('Container');
    expect(wrapper.length).toBe(1);
  });

  it('click search button', () => {
    const searchButton = component.find('#search-button').find('button');
    searchButton.simulate('click');
    expect(searchButton.length).toBe(1);
    const input = component.find('#search-input').find('input');
    input.simulate('change', { target: { value: '0' } });
    searchButton.simulate('click');
  });
});
